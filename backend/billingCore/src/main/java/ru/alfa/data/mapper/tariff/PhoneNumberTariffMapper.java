package ru.alfa.data.mapper.tariff;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.alfa.data.dto.tariff.ResponseWithTariffPhoneNumberTariffDto;
import ru.alfa.data.dto.tariff.ResponseWithoutTariffPhoneNumberTariffDto;
import ru.alfa.data.entity.tariff.PhoneNumberTariff;

@Mapper(componentModel = "spring", uses = {TariffMapper.class})
public interface PhoneNumberTariffMapper {

    @Mapping(target = "tariff", source = "tariff")
    ResponseWithTariffPhoneNumberTariffDto toResponseDtoWithTariff(PhoneNumberTariff phoneNumberTariff);

    ResponseWithoutTariffPhoneNumberTariffDto toResponseDtoWithoutTariff(PhoneNumberTariff phoneNumberTariff);

}