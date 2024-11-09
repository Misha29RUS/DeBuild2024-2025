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

@Service
@RequiredArgsConstructor
public class PhoneNumberTariffService {

    private final TariffRepository tariffRepository;

    private final PhoneNumberRepository phoneNumberRepository;

    private final PhoneNumberTariffMapper phoneNumberTariffMapper;

    private final HistoryOfTransactionRepository historyOfTransactionRepository;

    private final PhoneNumberTariffRepository phoneNumberTariffRepository;

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
