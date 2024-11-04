package ru.alfa.data.dto.phoneNumber;

import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceDto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

/**
 * DTO for {@link ru.alfa.data.entity.phoneNumber.PhoneNumber}
 */
public record ResponsePhoneNumberWithServicesInfoDto(Long id, String phoneNumber, BigDecimal balance,
                                                     Set<ResponsePhoneNumberMobileServiceDto> phoneNumberMobileServices)
        implements Serializable {
}