package ru.alfa.data.dto.phoneNumber;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO for {@link ru.alfa.data.entity.phoneNumber.PhoneNumber}
 */
public record ResponsePhoneNumberBalanceDto(Long id, String phoneNumber, BigDecimal balance,
                                            List<ResponseTransactionDto> historyOfTransaction) implements Serializable {
}