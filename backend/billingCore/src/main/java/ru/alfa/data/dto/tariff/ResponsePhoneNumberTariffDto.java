package ru.alfa.data.dto.tariff;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link ru.alfa.data.entity.tariff.PhoneNumberTariff}
 */
public record ResponsePhoneNumberTariffDto(Long id, ResponseTariffDto tariff, Boolean isActive,
                                           LocalDate dateOfStartPeriod, LocalDate dateOfEndPeriod,
                                           Integer remainingMinutes, Integer remainingSms, Double remainingGigabytes,
                                           Integer countMinutesAtStartOfPeriod, Integer countSmsAtStartOfPeriod,
                                           Double countGigabytesAtStartOfPeriod) implements Serializable {
}