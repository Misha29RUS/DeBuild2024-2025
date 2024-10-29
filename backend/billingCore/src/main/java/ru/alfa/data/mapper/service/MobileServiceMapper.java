package ru.alfa.data.mapper.service;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.service.RequestMobileServiceDto;
import ru.alfa.data.dto.service.ResponseMobileServiceDto;
import ru.alfa.data.entity.service.MobileService;

@Mapper(componentModel = "spring")
public interface MobileServiceMapper {

    MobileService toEntity(RequestMobileServiceDto requestMobileServiceDto);

    ResponseMobileServiceDto toResponseDto(MobileService mobileService);
}
