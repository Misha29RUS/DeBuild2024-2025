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

@Service
@RequiredArgsConstructor
public class PhoneNumberService {

    private final PhoneNumberRepository phoneNumberRepository;

    private final PhoneNumberMapper phoneNumberMapper;

    @Transactional
    public ResponsePhoneNumberBalanceDto getBalanceHistory(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", id));
        return phoneNumberMapper.toResponseBalanceDto(phoneNumber);
    }

    @Transactional
    public ResponsePhoneNumberWithUserInfoDto getPhoneNumberAndUserInfo(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", id));
        return phoneNumberMapper.toResponseWithUserInfoDto(phoneNumber);
    }

    @Transactional
    public ResponsePhoneNumberWithTariffInfoDto getPhoneNumberAndTariffInfo(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", id));
        return phoneNumberMapper.toResponseWithTariffInfoDto(phoneNumber);
    }

    @Transactional
    public ResponsePhoneNumberWithServicesInfoDto getPhoneNumberAndServicesInfo(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("PhoneNumber", id));
        return phoneNumberMapper.toResponseWithServicesInfoDto(phoneNumber);
    }
}
