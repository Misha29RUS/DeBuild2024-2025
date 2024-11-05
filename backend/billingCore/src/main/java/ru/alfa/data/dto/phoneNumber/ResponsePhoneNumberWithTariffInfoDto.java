package ru.alfa.data.dto.phoneNumber;

import ru.alfa.data.dto.tariff.ResponsePhoneNumberTariffDto;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link ru.alfa.data.entity.phoneNumber.PhoneNumber}
 */
public record ResponsePhoneNumberWithTariffInfoDto(Long id, String phoneNumber,
                                                   BigDecimal balance, ResponsePhoneNumberTariffDto phoneNumberTariff)
        implements Serializable {
}