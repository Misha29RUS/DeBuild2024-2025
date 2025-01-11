package ru.alfa.service.phoneNumber;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberBalanceDto;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberWithServicesInfoDto;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberWithTariffInfoDto;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberWithUserInfoDto;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;
import ru.alfa.data.mapper.phoneNumber.PhoneNumberMapper;
import ru.alfa.data.repository.phoneNumber.PhoneNumberRepository;
import ru.alfa.exception.EntityNotFoundException;

/**
 * Сервис для работы с телефонными номерами.
 * Этот класс предоставляет методы для получения информации о телефонных номерах,
 * включая историю баланса, информацию о пользователе, тарифах и услугах.
 */
@Service
@RequiredArgsConstructor
public class PhoneNumberService {

    /**
     * Репозиторий для работы с телефонными номерами.
     */
    private final PhoneNumberRepository phoneNumberRepository;

    /**
     * Маппер для преобразования между сущностями телефонных номеров и DTO.
     */
    private final PhoneNumberMapper phoneNumberMapper;

    /**
     * Получает историю баланса для указанного телефонного номера.
     *
     * @param id Идентификатор телефонного номера, для которого требуется получить историю баланса.
     * @return DTO с информацией о балансе телефонного номера.
     * @throws EntityNotFoundException Если телефонный номер с указанным идентификатором не найден.
     */
    @Transactional
    public ResponsePhoneNumberBalanceDto getBalanceHistory(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", id));
        return phoneNumberMapper.toResponseBalanceDto(phoneNumber);
    }

    /**
     * Получает информацию о телефонном номере и пользователе.
     *
     * @param id Идентификатор телефонного номера, для которого требуется получить информацию.
     * @return DTO с информацией о телефонном номере и пользователе.
     * @throws EntityNotFoundException Если телефонный номер с указанным идентификатором не найден.
     */
    @Transactional
    public ResponsePhoneNumberWithUserInfoDto getPhoneNumberAndUserInfo(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", id));
        return phoneNumberMapper.toResponseWithUserInfoDto(phoneNumber);
    }

    /**
     * Получает информацию о телефонном номере и тарифе.
     *
     * @param id Идентификатор телефонного номера, для которого требуется получить информацию о тарифе.
     * @return DTO с информацией о телефонном номере и тарифе.
     * @throws EntityNotFoundException Если телефонный номер с указанным идентификатором не найден.
     */
    @Transactional
    public ResponsePhoneNumberWithTariffInfoDto getPhoneNumberAndTariffInfo(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", id));
        return phoneNumberMapper.toResponseWithTariffInfoDto(phoneNumber);
    }

    /**
     * Получает информацию о телефонном номере и услугах.
     *
     * @param id Идентификатор телефонного номера, для которого требуется получить информацию об услугах.
     * @return DTO с информацией о телефонном номере и услугах.
     * @throws EntityNotFoundException Если телефонный номер с указанным идентификатором не найден.
     */
    @Transactional
    public ResponsePhoneNumberWithServicesInfoDto getPhoneNumberAndServicesInfo(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", id));
        return phoneNumberMapper.toResponseWithServicesInfoDto(phoneNumber);
    }
}
