package ru.alfa.data.mapper.phoneNumber;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberBalanceDto;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberWithServicesInfoDto;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberWithTariffInfoDto;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberWithUserInfoDto;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;
import ru.alfa.data.mapper.service.PhoneNumberMobileServiceMapper;
import ru.alfa.data.mapper.tariff.PhoneNumberTariffMapper;
import ru.alfa.data.mapper.user.UserMapper;

@Mapper(componentModel = "spring", uses = {HistoryOfTransactionMapper.class, UserMapper.class,
        PhoneNumberTariffMapper.class, PhoneNumberMobileServiceMapper.class})
public interface PhoneNumberMapper {

    @Mapping(target = "historyOfTransaction", source = "historyOfTransaction")
    ResponsePhoneNumberBalanceDto toResponseBalanceDto(PhoneNumber phoneNumber);

    @Mapping(target = "user", source = "user")
    ResponsePhoneNumberWithUserInfoDto toResponseWithUserInfoDto(PhoneNumber phoneNumber);

    @Mapping(target = "phoneNumberTariff", source = "phoneNumberTariff")
    ResponsePhoneNumberWithTariffInfoDto toResponseWithTariffInfoDto(PhoneNumber phoneNumber);

    @Mapping(target = "phoneNumberMobileServices", source = "phoneNumberMobileServices")
    ResponsePhoneNumberWithServicesInfoDto toResponseWithServicesInfoDto(PhoneNumber phoneNumber);
}
