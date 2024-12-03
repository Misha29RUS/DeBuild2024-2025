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
import ru.alfa.data.entity.tariff.enums.TariffType;
import ru.alfa.data.mapper.tariff.PhoneNumberTariffMapper;
import ru.alfa.data.repository.phoneNumber.HistoryOfTransactionRepository;
import ru.alfa.data.repository.phoneNumber.PhoneNumberRepository;
import ru.alfa.data.repository.tariff.PhoneNumberTariffRepository;
import ru.alfa.data.repository.tariff.TariffRepository;
import ru.alfa.exception.EntityNotFoundException;
import ru.alfa.exception.InsufficientFundsException;
import ru.alfa.exception.TariffIsNotAvailableException;

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
     * @return DTO без тарифа, связанного с обновленным тарифом телефонного номера.
     * @throws EntityNotFoundException       Если указанный телефонный номер или тариф не найден.
     * @throws TariffIsNotAvailableException Если тариф является настраиваемым и не может быть применен.
     * @throws InsufficientFundsException    Если недостаточно средств на счету телефонного номера для оплаты тарифа.
     */
    @Transactional
    public ResponseWithoutTariffPhoneNumberTariffDto updateTariffForPhoneNumber(Long phoneNumberId, Long tariffId) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(phoneNumberId).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", phoneNumberId));
        Tariff tariff = tariffRepository.findById(tariffId).orElseThrow(() ->
                new EntityNotFoundException("Tariff", tariffId));

        if (tariff.getType().equals(TariffType.CUSTOMIZABLE)) {
            throw new TariffIsNotAvailableException(tariff.getId(), tariff.getName());
        }

        if (phoneNumber.getBalance().subtract(tariff.getCost()).compareTo(BigDecimal.valueOf(-100)) < 0) {
            throw new InsufficientFundsException(phoneNumber.getBalance(), tariff.getCost());
        }

        PhoneNumberTariff phoneNumberTariff = createPhoneNumberTariff(phoneNumber, tariff);
        PhoneNumberTariff newPhoneNumberTariff = phoneNumberTariffRepository.save(phoneNumberTariff);

        HistoryOfTransaction historyOfTransaction = createTransaction(phoneNumber, tariff);
        historyOfTransactionRepository.save(historyOfTransaction);

        phoneNumber.setBalance(phoneNumber.getBalance().subtract(tariff.getCost()));
        phoneNumberRepository.save(phoneNumber);

        return phoneNumberTariffMapper.toResponseDtoWithoutTariff(newPhoneNumberTariff);

    }

    /**
     * Создает смежный объект тарифов - телефонный номер на основе указанного телефонного номера и тарифа.
     *
     * @param phoneNumber Телефонный номер, к которому применяется тариф.
     * @param tariff      Тариф, который будет применен к номеру.
     * @return Созданный объект тарифов телефонных номеров.
     */
    private PhoneNumberTariff createPhoneNumberTariff(PhoneNumber phoneNumber, Tariff tariff) {
        PhoneNumberTariff phoneNumberTariff = new PhoneNumberTariff();
        phoneNumberTariff.setId(phoneNumber.getId());
        phoneNumberTariff.setPhoneNumber(phoneNumber);
        phoneNumberTariff.setTariff(tariff);
        phoneNumberTariff.setDateOfStartPeriod(LocalDate.now());
        phoneNumberTariff.setDateOfEndPeriod(LocalDate.now().plusMonths(1));
        phoneNumberTariff.setCountGigabytesAtStartOfPeriod(tariff.getTariffResource().getCountGigabytes());
        phoneNumberTariff.setCountMinutesAtStartOfPeriod(tariff.getTariffResource().getCountMinutes());
        phoneNumberTariff.setCountSmsAtStartOfPeriod(tariff.getTariffResource().getCountSms());
        phoneNumberTariff.setRemainingGigabytes(tariff.getTariffResource().getCountGigabytes());
        phoneNumberTariff.setRemainingMinutes(tariff.getTariffResource().getCountMinutes());
        phoneNumberTariff.setRemainingSms(tariff.getTariffResource().getCountSms());
        phoneNumberTariff.setIsActive(true);
        return phoneNumberTariff;
    }

    /**
     * Создает запись о транзакции на основе указанного телефонного номера и тарифа.
     *
     * @param phoneNumber Телефонный номер, по которому осуществляется транзакция.
     * @param tariff      Тариф, который оплачивается в рамках транзакции.
     * @return Созданная запись о транзакции.
     */
    private HistoryOfTransaction createTransaction(PhoneNumber phoneNumber, Tariff tariff) {
        HistoryOfTransaction historyOfTransaction = new HistoryOfTransaction();
        historyOfTransaction.setPhoneNumber(phoneNumber);
        historyOfTransaction.setNameOfTransaction("Оплата тарифа: " + tariff.getName());
        historyOfTransaction.setAmountOfTransaction(tariff.getCost());
        historyOfTransaction.setDateOfTransaction(LocalDateTime.now());
        historyOfTransaction.setTypeOfTransaction(HistoryType.WITHDRAWAL);
        return historyOfTransaction;
    }
}
