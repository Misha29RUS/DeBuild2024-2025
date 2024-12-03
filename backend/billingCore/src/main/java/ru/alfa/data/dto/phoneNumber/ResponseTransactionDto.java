package ru.alfa.data.dto.phoneNumber;

import ru.alfa.data.entity.phoneNumber.enums.HistoryType;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO для представления информации о транзакции.
 *
 * @param id                  уникальный идентификатор транзакции.
 * @param nameOfTransaction   название транзакции.
 * @param amountOfTransaction сумма транзакции.
 * @param dateOfTransaction   дата и время совершения транзакции.
 * @param typeOfTransaction   тип транзакции, определяемый {@link HistoryType}.
 */
public record ResponseTransactionDto(Long id, String nameOfTransaction, BigDecimal amountOfTransaction,
                                     LocalDateTime dateOfTransaction,
                                     HistoryType typeOfTransaction) implements Serializable {
}