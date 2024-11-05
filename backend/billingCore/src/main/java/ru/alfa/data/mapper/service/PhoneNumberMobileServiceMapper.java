package ru.alfa.data.mapper.service;

import org.mapstruct.*;
import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceDto;
import ru.alfa.data.entity.service.PhoneNumberMobileService;

@Mapper(componentModel = "spring", uses = {MobileServiceMapper.class})
public interface PhoneNumberMobileServiceMapper {
    @Mapping(target = "mobileService", source = "mobileService")
    ResponsePhoneNumberMobileServiceDto toDto(PhoneNumberMobileService phoneNumberMobileService);
}