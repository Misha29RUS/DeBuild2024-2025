package ru.alfa.service.tariff;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.tariff.ResponseWithoutTariffPhoneNumberTariffDto;
import ru.alfa.data.entity.phoneNumber.HistoryOfTransaction;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;
import ru.alfa.data.entity.phoneNumber.enums.HistoryType;
import ru.alfa.data.entity.tariff.PhoneNumberTariff;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.entity.tariff.TariffResource;
import ru.alfa.data.entity.tariff.enums.TariffType;
import ru.alfa.data.mapper.tariff.PhoneNumberTariffMapper;
import ru.alfa.data.repository.phoneNumber.HistoryOfTransactionRepository;
import ru.alfa.data.repository.phoneNumber.PhoneNumberRepository;
import ru.alfa.data.repository.tariff.PhoneNumberTariffRepository;
import ru.alfa.data.repository.tariff.TariffRepository;
import ru.alfa.exception.EnablingTariffException;
import ru.alfa.exception.EntityNotFoundException;
import ru.alfa.exception.InsufficientFundsException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Сервис для управления тарифами телефонных номеров.
 * Этот класс предоставляет методы для обновления тарифов, связанных с телефонными номерами,
 * а также ведет историю транзакций.
 */
@Service
@RequiredArgsConstructor
public class PhoneNumberTariffService {

    /**
     * Репозиторий для работы с тарифами.
     */
    private final TariffRepository tariffRepository;

    /**
     * Репозиторий для работы с телефонными номерами.
     */
    private final PhoneNumberRepository phoneNumberRepository;

    /**
     * Маппер для преобразования между сущностями тарифов телефонных номеров и DTO.
     */
    private final PhoneNumberTariffMapper phoneNumberTariffMapper;

    /**
     * Репозиторий для работы с историей транзакций.
     */
    private final HistoryOfTransactionRepository historyOfTransactionRepository;

    /**
     * Репозиторий для работы с тарифами телефонных номеров.
     */
    private final PhoneNumberTariffRepository phoneNumberTariffRepository;

    /**
     * Обновляет тариф для указанного телефонного номера.
     *
     * @param phoneNumberId Идентификатор телефонного номера, для которого обновляется тариф.
     * @param tariffId      Идентификатор нового тарифа, который будет применен к номеру.
     * @param minutesStep
     * @param smsStep
     * @param gigabyteStep
     * @return DTO без тарифа, связанного с обновленным тарифом телефонного номера.
     * @throws EntityNotFoundException    Если указанный телефонный номер или тариф не найден.
     * @throws EnablingTariffException    Если тариф является настраиваемым и не может быть применен.
     * @throws InsufficientFundsException Если недостаточно средств на счету телефонного номера для оплаты тарифа.
     */
    @Transactional
    public ResponseWithoutTariffPhoneNumberTariffDto updateTariffForPhoneNumber(
            Long phoneNumberId, Long tariffId, Integer minutesStep,
            Integer smsStep, Integer gigabyteStep) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(phoneNumberId).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", phoneNumberId));
        Tariff tariff = tariffRepository.findById(tariffId).orElseThrow(() ->
                new EntityNotFoundException("Tariff", tariffId));
        TariffResource tariffResource = tariff.getTariffResource();
        if (tariff.getType().equals(TariffType.CUSTOMIZABLE)
                && (minutesStep == null
                || smsStep == null
                || gigabyteStep == null)) {
            throw new EnablingTariffException(tariffId, "Один из параметров равен null");
        }
        BigDecimal cost = tariff.getType().equals(TariffType.FIXED)
                ? tariff.getCost()
                : (tariffResource.getCostOneMinute().multiply(BigDecimal.valueOf(minutesStep))).
                add(tariffResource.getCostOneSms().multiply(BigDecimal.valueOf(smsStep))).
                add(tariffResource.getCostOneGigabyte().multiply(BigDecimal.valueOf(gigabyteStep)));

        if (phoneNumber.getBalance().subtract(cost).compareTo(BigDecimal.valueOf(-100)) < 0) {
            throw new InsufficientFundsException(phoneNumber.getBalance(), tariff.getCost());
        }

        PhoneNumberTariff phoneNumberTariff = createPhoneNumberTariff(phoneNumber, tariff, minutesStep,
                smsStep, gigabyteStep);
        PhoneNumberTariff newPhoneNumberTariff = phoneNumberTariffRepository.save(phoneNumberTariff);

        HistoryOfTransaction historyOfTransaction = createTransaction(phoneNumber, tariff, cost);
        historyOfTransactionRepository.save(historyOfTransaction);

        phoneNumber.setBalance(phoneNumber.getBalance().subtract(cost));
        phoneNumberRepository.save(phoneNumber);

        return phoneNumberTariffMapper.toResponseDtoWithoutTariff(newPhoneNumberTariff);

    }

    /**
     * Создает смежный объект тарифов - телефонный номер на основе указанного телефонного номера и тарифа.
     *
     * @param phoneNumber  Телефонный номер, к которому применяется тариф.
     * @param tariff       Тариф, который будет применен к номеру.
     * @param minutesStep шаг минут
     * @param smsStep шаг смс
     * @param gigabyteStep шаг гб
     * @return Созданный объект тарифов телефонных номеров.
     */
    private PhoneNumberTariff createPhoneNumberTariff(PhoneNumber phoneNumber, Tariff tariff,
                                                      Integer minutesStep, Integer smsStep, Integer gigabyteStep) {
        PhoneNumberTariff phoneNumberTariff = new PhoneNumberTariff();
        phoneNumberTariff.setId(phoneNumber.getId());
        phoneNumberTariff.setPhoneNumber(phoneNumber);
        phoneNumberTariff.setTariff(tariff);
        phoneNumberTariff.setDateOfStartPeriod(LocalDate.now());
        phoneNumberTariff.setDateOfEndPeriod(LocalDate.now().plusMonths(1));

        TariffResource tariffResource = tariff.getTariffResource();
        if (tariff.getType().equals(TariffType.FIXED)) {
            phoneNumberTariff.setCountGigabytesAtStartOfPeriod(tariffResource.getCountGigabytes());
            phoneNumberTariff.setCountMinutesAtStartOfPeriod(tariffResource.getCountMinutes());
            phoneNumberTariff.setCountSmsAtStartOfPeriod(tariffResource.getCountSms());
            phoneNumberTariff.setRemainingGigabytes(tariffResource.getCountGigabytes());
            phoneNumberTariff.setRemainingMinutes(tariffResource.getCountMinutes());
            phoneNumberTariff.setRemainingSms(tariffResource.getCountSms());
        } else {
            if (!tariffResource.getStepsMinutes().contains(minutesStep)
            || !tariffResource.getStepsSms().contains(smsStep)
            || !tariffResource.getStepsGigabytes().contains(gigabyteStep)){
                    throw new EnablingTariffException(tariff.getId(), "Одно из значений ресурса недоступно в данном тарифе");
            }
            phoneNumberTariff.setCountGigabytesAtStartOfPeriod(Double.valueOf(gigabyteStep));
            phoneNumberTariff.setCountMinutesAtStartOfPeriod(minutesStep);
            phoneNumberTariff.setCountSmsAtStartOfPeriod(smsStep);
            phoneNumberTariff.setRemainingGigabytes(Double.valueOf(gigabyteStep));
            phoneNumberTariff.setRemainingMinutes(minutesStep);
            phoneNumberTariff.setRemainingSms(smsStep);
        }

        phoneNumberTariff.setIsActive(true);
        return phoneNumberTariff;
    }

    /**
     * Создает запись о транзакции на основе указанного телефонного номера и тарифа.
     *
     * @param phoneNumber Телефонный номер, по которому осуществляется транзакция.
     * @param tariff      Тариф, который оплачивается в рамках транзакции.
     * @param cost
     * @return Созданная запись о транзакции.
     */
    private HistoryOfTransaction createTransaction(PhoneNumber phoneNumber, Tariff tariff, BigDecimal cost) {
        HistoryOfTransaction historyOfTransaction = new HistoryOfTransaction();
        historyOfTransaction.setPhoneNumber(phoneNumber);
        historyOfTransaction.setNameOfTransaction("Оплата тарифа: " + tariff.getName());
        historyOfTransaction.setAmountOfTransaction(cost);
        historyOfTransaction.setDateOfTransaction(LocalDateTime.now());
        historyOfTransaction.setTypeOfTransaction(HistoryType.WITHDRAWAL);
        return historyOfTransaction;
    }
}
