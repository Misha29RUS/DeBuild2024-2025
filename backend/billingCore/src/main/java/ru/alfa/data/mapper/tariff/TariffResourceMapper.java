package ru.alfa.data.mapper.tariff;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.tariff.RequestTariffResourceDto;
import ru.alfa.data.dto.tariff.ResponseTariffResourceDto;
import ru.alfa.data.entity.tariff.TariffResource;

/**
 * Mapper интерфейс для преобразования объектов типа {@link RequestTariffResourceDto}
 * {@link TariffResource} и обратно в {@link ResponseTariffResourceDto}.
 */
@Mapper(componentModel = "spring")
public interface TariffResourceMapper {

    /**
     * Преобразует объект {@link RequestTariffResourceDto} в {@link TariffResource}.
     *
     * @param requestTariffResourceDto объект типа {@link RequestTariffResourceDto},
     *                                 который необходимо преобразовать.
     * @return объект типа {@link TariffResource}, полученный в результате преобразования.
     */
    TariffResource toEntity(RequestTariffResourceDto requestTariffResourceDto);

    /**
     * Преобразует объект {@link TariffResource} в {@link ResponseTariffResourceDto}.
     *
     * @param tariffResource объект типа {@link TariffResource}, который необходимо преобразовать.
     * @return объект типа {@link ResponseTariffResourceDto}, полученный в результате преобразования.
     */
    ResponseTariffResourceDto toResponseDto(TariffResource tariffResource);
}
