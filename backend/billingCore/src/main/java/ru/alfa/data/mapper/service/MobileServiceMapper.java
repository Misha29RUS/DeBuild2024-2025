package ru.alfa.data.mapper.service;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.service.RequestMobileServiceDto;
import ru.alfa.data.dto.service.ResponseMobileServiceDto;
import ru.alfa.data.entity.service.MobileService;

/**
 * Mapper интерфейс для преобразования объектов типа {@link RequestMobileServiceDto}
 * в {@link MobileService} и обратно в {@link ResponseMobileServiceDto}.
 */
@Mapper(componentModel = "spring")
public interface MobileServiceMapper {

    /**
     * Преобразует объект {@link RequestMobileServiceDto} в {@link MobileService}.
     *
     * @param requestMobileServiceDto объект типа {@link RequestMobileServiceDto},
     *                                который необходимо преобразовать.
     * @return объект типа {@link MobileService}, полученный в результате преобразования.
     */
    MobileService toEntity(RequestMobileServiceDto requestMobileServiceDto);

    /**
     * Преобразует объект {@link MobileService} в {@link ResponseMobileServiceDto}.
     *
     * @param mobileService объект типа {@link MobileService}, который необходимо преобразовать.
     * @return объект типа {@link ResponseMobileServiceDto}, полученный в результате преобразования.
     */
    ResponseMobileServiceDto toResponseDto(MobileService mobileService);

}
