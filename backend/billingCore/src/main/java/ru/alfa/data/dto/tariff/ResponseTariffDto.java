package ru.alfa.data.dto.tariff;

import ru.alfa.data.entity.tariff.enums.TariffStatus;
import ru.alfa.data.entity.tariff.enums.TariffType;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link ru.alfa.data.entity.tariff.Tariff}
 */
public record ResponseTariffDto(Long id, TariffType type, TariffStatus status, String name, String description,
                                BigDecimal cost, Integer countMinutes, Integer countSms,
                                Double countGigabytes) implements Serializable {

}
