package ru.alfa.data.mapper.abonentsTable;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alfa.data.dto.abonentsTable.ResponseAbonetsTableDto;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;
import ru.alfa.data.mapper.service.PhoneNumberMobileServiceMapper;
import ru.alfa.data.mapper.tariff.PhoneNumberTariffMapper;
import ru.alfa.data.mapper.user.UserMapper;

/**
 * Mapper интерфейс для преобразования объектов типа {@link PhoneNumber} в
 * {@link ResponseAbonetsTableDto}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class,
        PhoneNumberTariffMapper.class, PhoneNumberMobileServiceMapper.class})
public interface AbonentsTableMapper {

    /**
     * Преобразует объект {@link PhoneNumber} в {@link ResponseAbonetsTableDto}.
     *
     * @param phoneNumber объект типа {@link PhoneNumber}, который необходимо преобразовать.
     * @return объект типа {@link ResponseAbonetsTableDto}, полученный в результате преобразования
     */
    @Mapping(target = "user", source = "user")
    @Mapping(target = "phoneNumberTariff", source = "phoneNumberTariff")
    @Mapping(target = "phoneNumberMobileServices", source = "phoneNumberMobileServices")
    ResponseAbonetsTableDto toResponseAbonetsTableDto(PhoneNumber phoneNumber);
}
