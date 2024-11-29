package ru.alfa.data.mapper.tariff;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import ru.alfa.data.dto.tariff.RequestTariffDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.entity.tariff.TariffResource;

/**
 * Mapper интерфейс для преобразования объектов типа {@link RequestTariffDto}
 * в {@link Tariff} и обратно в {@link ResponseTariffDto}.
 */
@Mapper(componentModel = "spring", uses = {TariffResourceMapper.class})
public interface TariffMapper {

    /**
     * Преобразует объект {@link RequestTariffDto} в {@link Tariff}.
     *
     * @param requestTariffDto объект типа {@link RequestTariffDto},
     *                         который необходимо преобразовать.
     * @return объект типа {@link Tariff}, полученный в результате преобразования.
     */
    @Mapping(target = "tariffResource", source = "tariffResourceDto")
    Tariff toEntity(RequestTariffDto requestTariffDto);

    /**
     * Преобразует объект {@link Tariff} в {@link ResponseTariffDto}.
     *
     * @param tariff объект типа {@link Tariff}, который необходимо преобразовать.
     * @return объект типа {@link ResponseTariffDto}, полученный в результате преобразования.
     */
    @Mapping(target = "tariffResourceDto", source = "tariffResource")
    ResponseTariffDto toResponseDto(Tariff tariff);

    /**
     * Связывает объект {@link Tariff} с его ресурсом тарифов ({@link TariffResource})
     * после завершения маппинга.
     *
     * @param tariff объект типа {@link Tariff}, к которому необходимо привязать ресурс.
     */
    @AfterMapping
    default void linkTariffResource(@MappingTarget Tariff tariff) {
        TariffResource tariffResource = tariff.getTariffResource();
        if (tariffResource != null) {
            tariffResource.setTariff(tariff);
        }
    }
}
