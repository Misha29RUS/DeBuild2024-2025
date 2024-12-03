package ru.alfa.data.dto.phoneNumber;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO для представления информации о балансе телефонного номера
 * и истории транзакций.
 *
 * @param id                   уникальный идентификатор записи.
 * @param phoneNumber          номер телефона.
 * @param balance              текущий баланс телефонного номера.
 * @param historyOfTransaction список транзакций, связанных с телефонным номером.
 */
public record ResponsePhoneNumberBalanceDto(Long id, String phoneNumber, BigDecimal balance,
                                            List<ResponseTransactionDto> historyOfTransaction) implements Serializable {
}