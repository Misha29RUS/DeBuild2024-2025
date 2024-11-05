package ru.alfa.data.mapper.tariff;

import org.mapstruct.*;
import ru.alfa.data.dto.tariff.ResponsePhoneNumberTariffDto;
import ru.alfa.data.entity.tariff.PhoneNumberTariff;

@Mapper(componentModel = "spring", uses = {TariffMapper.class})
public interface PhoneNumberTariffMapper {

    @Mapping(target = "tariff", source = "tariff")
    ResponsePhoneNumberTariffDto toDto(PhoneNumberTariff phoneNumberTariff);

}