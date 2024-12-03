package ru.alfa.data.mapper.service;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.service.ResponsePhoneNumberServiceIdDto;
import ru.alfa.data.entity.service.PhoneNumberServiceId;

/**
 * Mapper интерфейс для преобразования объектов типа {@link PhoneNumberServiceId}
 * в {@link ResponsePhoneNumberServiceIdDto}.
 */
@Mapper(componentModel = "spring")
public interface PhoneNumberServiceIdMapper {

    /**
     * Преобразует объект {@link PhoneNumberServiceId} в {@link ResponsePhoneNumberServiceIdDto}.
     *
     * @param phoneNumberServiceId объект типа {@link PhoneNumberServiceId},
     *                             который необходимо преобразовать.
     * @return объект типа {@link ResponsePhoneNumberServiceIdDto},
     * полученный в результате преобразования.
     */
    ResponsePhoneNumberServiceIdDto toDto(PhoneNumberServiceId phoneNumberServiceId);

}