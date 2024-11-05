package ru.alfa.data.mapper.tariff;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import ru.alfa.data.dto.tariff.RequestTariffDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.entity.tariff.TariffResource;

@Mapper(componentModel = "spring", uses = {TariffResourceMapper.class})
public interface TariffMapper {

    @Mapping(target = "tariffResource", source = "tariffResourceDto")
    Tariff toEntity(RequestTariffDto requestTariffDto);

    @Mapping(target = "tariffResourceDto", source = "tariffResource")
    ResponseTariffDto toResponseDto(Tariff tariff);

    @AfterMapping
    default void linkTariffResource(@MappingTarget Tariff tariff) {
        TariffResource tariffResource = tariff.getTariffResource();
        if (tariffResource != null) {
            tariffResource.setTariff(tariff);
        }
    }
}
