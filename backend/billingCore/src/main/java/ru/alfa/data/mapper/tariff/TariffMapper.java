package ru.alfa.data.mapper.tariff;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.tariff.RequestTariffDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.data.entity.tariff.Tariff;

@Mapper(componentModel = "spring")
public interface TariffMapper {

    Tariff toEntity(RequestTariffDto requestTariffDto);

    ResponseTariffDto toResponseDto(Tariff tariff);
}
