package ru.alfa.data.mapper.service;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceDto;
import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceWithIdDto;
import ru.alfa.data.entity.service.PhoneNumberMobileService;

/**
 * Mapper интерфейс для преобразования объектов типа {@link PhoneNumberMobileService}
 * в различные DTO
 */
@Mapper(componentModel = "spring", uses = {MobileServiceMapper.class, PhoneNumberServiceIdMapper.class})
public interface PhoneNumberMobileServiceMapper {

    /**
     * Преобразует объект {@link PhoneNumberMobileService} в {@link ResponsePhoneNumberMobileServiceDto}.
     *
     * @param phoneNumberMobileService объект типа {@link PhoneNumberMobileService},
     *                                 который необходимо преобразовать.
     * @return объект типа {@link ResponsePhoneNumberMobileServiceDto},
     *         полученный в результате преобразования.
     */
    @Mapping(target = "mobileService", source = "mobileService")
    ResponsePhoneNumberMobileServiceDto toDto(PhoneNumberMobileService phoneNumberMobileService);

    /**
     * Преобразует объект {@link PhoneNumberMobileService} в {@link ResponsePhoneNumberMobileServiceWithIdDto}.
     *
     * @param phoneNumberMobileService объект типа {@link PhoneNumberMobileService},
     *                                 который необходимо преобразовать.
     * @return объект типа {@link ResponsePhoneNumberMobileServiceWithIdDto},
     *         полученный в результате преобразования.
     */
    @Mapping(target = "id", source = "id")
    ResponsePhoneNumberMobileServiceWithIdDto toResponseWithIdDto(PhoneNumberMobileService phoneNumberMobileService);

}