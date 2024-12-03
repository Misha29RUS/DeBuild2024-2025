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

/**
 * Сервис для управления мобильными услугами, связанными с телефонными номерами.
 * Этот класс предоставляет методы для активации и деактивации услуг для телефонных номеров,
 * а также ведет историю транзакций.
 */
@Service
@RequiredArgsConstructor
public class PhoneNumberMobileServiceService {

    /**
     * Репозиторий для работы с мобильными услугами.
     */
    private final MobileServiceRepository mobileServiceRepository;

    /**
     * Репозиторий для работы с телефонными номерами.
     */
    private final PhoneNumberRepository phoneNumberRepository;

    /**
     * Репозиторий для работы с мобильными услугами телефонных номеров.
     */
    private final PhoneNumberServiceRepository phoneNumberServiceRepository;

    /**
     * Маппер для преобразования между сущностями мобильных услуг телефонных номеров и DTO.
     */
    private final PhoneNumberMobileServiceMapper phoneNumberMobileServiceMapper;

    /**
     * Репозиторий для работы с историей транзакций.
     */
    private final HistoryOfTransactionRepository historyOfTransactionRepository;

    /**
     * Активирует услугу для указанного телефонного номера.
     *
     * @param phoneNumberId Идентификатор телефонного номера, для которого активируется услуга.
     * @param serviceId     Идентификатор мобильной услуги, которая будет активирована.
     * @return DTO с информацией об активированной услуге для телефонного номера.
     * @throws EntityNotFoundException    Если указанный телефонный номер или мобильная услуга не найдены.
     * @throws InsufficientFundsException Если недостаточно средств на счету телефонного номера для активации услуги.
     */
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

    /**
     * Создает объект мобильной услуги для указанного телефонного номера и услуги.
     *
     * @param phoneNumberId Идентификатор телефонного номера.
     * @param serviceId     Идентификатор мобильной услуги.
     * @param phoneNumber   Телефонный номер, к которому применяется услуга.
     * @param mobileService Мобильная услуга, которую необходимо активировать.
     * @return Созданный объект мобильной услуги для телефонного номера.
     */
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

    /**
     * Создает запись о транзакции на основе указанного телефонного номера и мобильной услуги.
     *
     * @param phoneNumber   Телефонный номер, по которому осуществляется транзакция.
     * @param mobileService Мобильная услуга, которая оплачивается в рамках транзакции.
     * @return Созданная запись о транзакции.
     */
    private HistoryOfTransaction createTransaction(PhoneNumber phoneNumber, MobileService mobileService) {
        HistoryOfTransaction historyOfTransaction = new HistoryOfTransaction();
        historyOfTransaction.setPhoneNumber(phoneNumber);
        historyOfTransaction.setNameOfTransaction("Оплата услуги: " + mobileService.getName());
        historyOfTransaction.setAmountOfTransaction(mobileService.getCost());
        historyOfTransaction.setDateOfTransaction(LocalDateTime.now());
        historyOfTransaction.setTypeOfTransaction(HistoryType.WITHDRAWAL);
        return historyOfTransaction;
    }

    /**
     * Деактивирует услугу для указанного телефонного номера.
     *
     * @param phoneNumberId Идентификатор телефонного номера, для которого деактивируется услуга.
     * @param serviceId     Идентификатор мобильной услуги, которая будет деактивирована.
     */
    public void deactivateServiceForPhoneNumber(Long phoneNumberId, Long serviceId) {
        PhoneNumberServiceId phoneNumberServiceId = new PhoneNumberServiceId();
        phoneNumberServiceId.setPhoneNumberId(phoneNumberId);
        phoneNumberServiceId.setServiceId(serviceId);

        phoneNumberServiceRepository.deleteById(phoneNumberServiceId);
    }
}
