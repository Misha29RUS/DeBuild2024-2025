package ru.alfa.data.mapper.service;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceDto;
import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceWithIdDto;
import ru.alfa.data.entity.service.PhoneNumberMobileService;

@Mapper(componentModel = "spring", uses = {MobileServiceMapper.class, PhoneNumberServiceIdMapper.class})
public interface PhoneNumberMobileServiceMapper {
    @Mapping(target = "mobileService", source = "mobileService")
    ResponsePhoneNumberMobileServiceDto toDto(PhoneNumberMobileService phoneNumberMobileService);

    @Mapping(target = "id", source = "id")
    ResponsePhoneNumberMobileServiceWithIdDto toResponseWithIdDto(PhoneNumberMobileService phoneNumberMobileService);

}