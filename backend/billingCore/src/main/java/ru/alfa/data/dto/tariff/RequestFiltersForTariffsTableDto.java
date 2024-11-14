package ru.alfa.data.dto.tariff;

import ru.alfa.data.entity.tariff.enums.TariffStatus;
import ru.alfa.data.entity.tariff.enums.TariffType;

import java.io.Serializable;

public record RequestFiltersForTariffsTableDto(TariffType type, TariffStatus status, String name)
        implements Serializable {
}
