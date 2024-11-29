package ru.alfa.data.dto.tariff;

import ru.alfa.data.entity.tariff.enums.TariffStatus;
import ru.alfa.data.entity.tariff.enums.TariffType;

import java.io.Serializable;

/**
 * DTO для передачи фильтров, используемых при запросе
 * данных о тарифах в таблице.
 *
 * @param type тип тарифа, определяемый {@link TariffType}.
 * @param status статус тарифа, определяемый {@link TariffStatus}.
 * @param name название тарифа.
 */
public record RequestFiltersForTariffsTableDto(TariffType type, TariffStatus status, String name)
        implements Serializable {
}
