package ru.alfa.data.mapper.tariff;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alfa.data.dto.tariff.ResponseWithTariffPhoneNumberTariffDto;
import ru.alfa.data.dto.tariff.ResponseWithoutTariffPhoneNumberTariffDto;
import ru.alfa.data.entity.tariff.PhoneNumberTariff;

/**
 * Mapper интерфейс для преобразования объектов типа {@link PhoneNumberTariff}
 * в различные DTO
 */
@Mapper(componentModel = "spring", uses = {TariffMapper.class})
public interface PhoneNumberTariffMapper {

    /**
     * Преобразует объект {@link PhoneNumberTariff} в {@link ResponseWithTariffPhoneNumberTariffDto}.
     *
     * @param phoneNumberTariff объект типа {@link PhoneNumberTariff},
     *                          который необходимо преобразовать.
     * @return объект типа {@link ResponseWithTariffPhoneNumberTariffDto},
     *         полученный в результате преобразования.
     */
    @Mapping(target = "tariff", source = "tariff")
    ResponseWithTariffPhoneNumberTariffDto toResponseDtoWithTariff(PhoneNumberTariff phoneNumberTariff);

    /**
     * Преобразует объект {@link PhoneNumberTariff} в {@link ResponseWithoutTariffPhoneNumberTariffDto}.
     *
     * @param phoneNumberTariff объект типа {@link PhoneNumberTariff},
     *                          который необходимо преобразовать.
     * @return объект типа {@link ResponseWithoutTariffPhoneNumberTariffDto},
     *         полученный в результате преобразования.
     */
    ResponseWithoutTariffPhoneNumberTariffDto toResponseDtoWithoutTariff(PhoneNumberTariff phoneNumberTariff);

}