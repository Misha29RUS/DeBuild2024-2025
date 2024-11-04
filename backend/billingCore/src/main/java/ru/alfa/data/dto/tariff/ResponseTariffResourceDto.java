package ru.alfa.data.dto.tariff;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO for {@link ru.alfa.data.entity.tariff.TariffResource}
 */
public record ResponseTariffResourceDto(Long id, Integer countMinutes, BigDecimal costOneMinute,
                                        List<Integer> stepsMinutes, Integer countSms, BigDecimal costOneSms,
                                        List<Integer> stepsSms, Double countGigabytes, BigDecimal costOneGigabyte,
                                        List<Integer> stepsGigabytes) implements Serializable {
}