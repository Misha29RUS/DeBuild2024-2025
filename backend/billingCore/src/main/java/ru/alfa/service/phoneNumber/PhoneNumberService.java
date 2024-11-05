package ru.alfa.service.phoneNumber;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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

    public ResponsePhoneNumberBalanceDto getBalanceHistory(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(id));
        return phoneNumberMapper.toResponseBalanceDto(phoneNumber);
    }

    public ResponsePhoneNumberWithUserInfoDto getPhoneNumberAndUserInfo(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(id));
        return phoneNumberMapper.toResponseWithUserInfoDto(phoneNumber);
    }

    public ResponsePhoneNumberWithTariffInfoDto getPhoneNumberAndTariffInfo(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(id));
        return phoneNumberMapper.toResponseWithTariffInfoDto(phoneNumber);
    }

    public ResponsePhoneNumberWithServicesInfoDto getPhoneNumberAndServicesInfo(Long id) {
        PhoneNumber phoneNumber = phoneNumberRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(id));
        return phoneNumberMapper.toResponseWithServicesInfoDto(phoneNumber);
    }
}
