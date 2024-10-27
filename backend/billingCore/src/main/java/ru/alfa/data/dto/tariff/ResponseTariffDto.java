package ru.alfa.data.dto.tariff;

import ru.alfa.data.entity.tariff.enums.TariffStatus;
import ru.alfa.data.entity.tariff.enums.TariffType;

import java.math.BigDecimal;

public record ResponseTariffDto(Long id, TariffType type, TariffStatus status, String name, String description,
                                BigDecimal cost, Integer countMinutes, Integer countSms, Double countGigabytes) {
}
