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

/**
 * Mapper интерфейс для преобразования объектов типа {@link PhoneNumber} в
 * различные DTO
 */
@Mapper(componentModel = "spring", uses = {HistoryOfTransactionMapper.class, UserMapper.class,
        PhoneNumberTariffMapper.class, PhoneNumberMobileServiceMapper.class})
public interface PhoneNumberMapper {

    /**
     * Преобразует объект {@link PhoneNumber} в {@link ResponsePhoneNumberBalanceDto}.
     *
     * @param phoneNumber объект типа {@link PhoneNumber}, который необходимо преобразовать.
     * @return объект типа {@link ResponsePhoneNumberBalanceDto}, полученный в результате преобразования.
     */
    @Mapping(target = "historyOfTransaction", source = "historyOfTransaction")
    ResponsePhoneNumberBalanceDto toResponseBalanceDto(PhoneNumber phoneNumber);

    /**
     * Преобразует объект {@link PhoneNumber} в {@link ResponsePhoneNumberWithUserInfoDto}.
     *
     * @param phoneNumber объект типа {@link PhoneNumber}, который необходимо преобразовать.
     * @return объект типа {@link ResponsePhoneNumberWithUserInfoDto}, полученный в результате преобразования.
     */
    @Mapping(target = "user", source = "user")
    ResponsePhoneNumberWithUserInfoDto toResponseWithUserInfoDto(PhoneNumber phoneNumber);

    /**
     * Преобразует объект {@link PhoneNumber} в {@link ResponsePhoneNumberWithTariffInfoDto}.
     *
     * @param phoneNumber объект типа {@link PhoneNumber}, который необходимо преобразовать.
     * @return объект типа {@link ResponsePhoneNumberWithTariffInfoDto}, полученный в результате преобразования.
     */
    @Mapping(target = "phoneNumberTariff", source = "phoneNumberTariff")
    ResponsePhoneNumberWithTariffInfoDto toResponseWithTariffInfoDto(PhoneNumber phoneNumber);

    /**
     * Преобразует объект {@link PhoneNumber} в {@link ResponsePhoneNumberWithServicesInfoDto}.
     *
     * @param phoneNumber объект типа {@link PhoneNumber}, который необходимо преобразовать.
     * @return объект типа {@link ResponsePhoneNumberWithServicesInfoDto}, полученный в результате преобразования.
     */
    @Mapping(target = "phoneNumberMobileServices", source = "phoneNumberMobileServices")
    ResponsePhoneNumberWithServicesInfoDto toResponseWithServicesInfoDto(PhoneNumber phoneNumber);
}
