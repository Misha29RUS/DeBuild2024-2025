package ru.alfa.data.dto.phoneNumber;

import ru.alfa.data.entity.phoneNumber.enums.HistoryType;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO for {@link ru.alfa.data.entity.phoneNumber.HistoryOfTransaction}
 */
public record ResponseTransactionDto(Long id, String nameOfTransaction, BigDecimal amountOfTransaction,
                                     LocalDateTime dateOfTransaction,
                                     HistoryType typeOfTransaction) implements Serializable {
}