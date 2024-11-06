package ru.alfa.data.mapper.service;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.service.ResponsePhoneNumberServiceIdDto;
import ru.alfa.data.entity.service.PhoneNumberServiceId;

@Mapper(componentModel = "spring")
public interface PhoneNumberServiceIdMapper {

    ResponsePhoneNumberServiceIdDto toDto(PhoneNumberServiceId phoneNumberServiceId);

}