package ru.alfa.data.mapper.tariff;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.tariff.RequestTariffResourceDto;
import ru.alfa.data.dto.tariff.ResponseTariffResourceDto;
import ru.alfa.data.entity.tariff.TariffResource;

@Mapper(componentModel = "spring")
public interface TariffResourceMapper {

    TariffResource toEntity(RequestTariffResourceDto requestTariffResourceDto);

    ResponseTariffResourceDto toResponseDto(TariffResource tariffResource);
}
