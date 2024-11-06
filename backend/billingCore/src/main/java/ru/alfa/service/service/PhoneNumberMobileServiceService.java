package ru.alfa.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceWithIdDto;
import ru.alfa.data.entity.phoneNumber.HistoryOfTransaction;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;
import ru.alfa.data.entity.phoneNumber.enums.HistoryType;
import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.entity.service.PhoneNumberMobileService;
import ru.alfa.data.entity.service.PhoneNumberServiceId;
import ru.alfa.data.mapper.service.PhoneNumberMobileServiceMapper;
import ru.alfa.data.repository.phoneNumber.HistoryOfTransactionRepository;
import ru.alfa.data.repository.phoneNumber.PhoneNumberRepository;
import ru.alfa.data.repository.service.MobileServiceRepository;
import ru.alfa.data.repository.service.PhoneNumberServiceRepository;
import ru.alfa.exception.EntityNotFoundException;
import ru.alfa.exception.InsufficientFundsException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PhoneNumberMobileServiceService {

    private final MobileServiceRepository mobileServiceRepository;

    private final PhoneNumberRepository phoneNumberRepository;

    private final PhoneNumberServiceRepository phoneNumberServiceRepository;

    private final PhoneNumberMobileServiceMapper phoneNumberMobileServiceMapper;

    private final HistoryOfTransactionRepository historyOfTransactionRepository;

    @Transactional
    public ResponsePhoneNumberMobileServiceWithIdDto activateServiceForPhoneNumber(Long phoneNumberId, Long serviceId) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(phoneNumberId).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", phoneNumberId));
        MobileService mobileService = mobileServiceRepository.findById(serviceId).orElseThrow(() ->
                new EntityNotFoundException("Mobile service", serviceId));

        if (phoneNumber.getBalance().subtract(mobileService.getCost()).compareTo(BigDecimal.valueOf(-100)) < 0) {
            throw new InsufficientFundsException(phoneNumber.getBalance(), mobileService.getCost());
        }

        PhoneNumberMobileService phoneNumberMobileService = createPhoneNumberMobileService(phoneNumberId, serviceId,
                phoneNumber, mobileService);
        PhoneNumberMobileService newPhoneNumberMobileService = phoneNumberServiceRepository.
                save(phoneNumberMobileService);

        HistoryOfTransaction historyOfTransaction = createTransaction(phoneNumber, mobileService);
        historyOfTransactionRepository.save(historyOfTransaction);
        phoneNumber.setBalance(phoneNumber.getBalance().subtract(mobileService.getCost()));
        phoneNumberRepository.save(phoneNumber);

        return phoneNumberMobileServiceMapper.toResponseWithIdDto(newPhoneNumberMobileService);
    }

    private PhoneNumberMobileService createPhoneNumberMobileService(Long phoneNumberId, Long serviceId,
                                                                    PhoneNumber phoneNumber,
                                                                    MobileService mobileService) {
        PhoneNumberMobileService phoneNumberMobileService = new PhoneNumberMobileService();

        PhoneNumberServiceId phoneNumberServiceId = new PhoneNumberServiceId();
        phoneNumberServiceId.setPhoneNumberId(phoneNumberId);
        phoneNumberServiceId.setServiceId(serviceId);
        phoneNumberMobileService.setId(phoneNumberServiceId);

        phoneNumberMobileService.setPhoneNumber(phoneNumber);
        phoneNumberMobileService.setMobileService(mobileService);
        phoneNumberMobileService.setDateOfStartPeriod(LocalDate.now());
        phoneNumberMobileService.setDateOfEndPeriod(LocalDate.now().plusMonths(1));
        phoneNumberMobileService.setType(mobileService.getType());
        phoneNumberMobileService.setRemainingResources(mobileService.getCountResources());
        return phoneNumberMobileService;
    }

    private HistoryOfTransaction createTransaction(PhoneNumber phoneNumber, MobileService mobileService) {
        HistoryOfTransaction historyOfTransaction = new HistoryOfTransaction();
        historyOfTransaction.setPhoneNumber(phoneNumber);
        historyOfTransaction.setNameOfTransaction("Оплата услуги: " + mobileService.getName());
        historyOfTransaction.setAmountOfTransaction(mobileService.getCost());
        historyOfTransaction.setDateOfTransaction(LocalDateTime.now());
        historyOfTransaction.setTypeOfTransaction(HistoryType.WITHDRAWAL);
        return historyOfTransaction;
    }

    public void deactivateServiceForPhoneNumber(Long phoneNumberId, Long serviceId) {
        PhoneNumberServiceId phoneNumberServiceId = new PhoneNumberServiceId();
        phoneNumberServiceId.setPhoneNumberId(phoneNumberId);
        phoneNumberServiceId.setServiceId(serviceId);

        phoneNumberServiceRepository.deleteById(phoneNumberServiceId);
    }
}
