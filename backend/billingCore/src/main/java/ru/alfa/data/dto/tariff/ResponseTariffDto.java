package ru.alfa.data.dto.tariff;

import ru.alfa.data.entity.tariff.enums.TariffStatus;
import ru.alfa.data.entity.tariff.enums.TariffType;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO для представления информации о тарифе.
 *
 * @param id                уникальный идентификатор тарифа.
 * @param type              тип тарифа, определяемый {@link TariffType}.
 * @param status            статус тарифа, определяемый {@link TariffStatus}.
 * @param name              название тарифа.
 * @param description       описание тарифа.
 * @param cost              стоимость тарифа.
 * @param tariffResourceDto информация о ресурсах тарифа, определяемая
 *                          {@link ResponseTariffResourceDto}.
 */
public record ResponseTariffDto(Long id, TariffType type, TariffStatus status, String name, String description,
                                BigDecimal cost, ResponseTariffResourceDto tariffResourceDto) implements Serializable {

}
