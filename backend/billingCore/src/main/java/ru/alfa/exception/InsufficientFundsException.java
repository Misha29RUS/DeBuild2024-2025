package ru.alfa.exception;

import java.math.BigDecimal;

/**
 * Исключение, выбрасываемое при недостатке средств на счете
 */
public class InsufficientFundsException extends RuntimeException {

    /**
     * Конструктор исключения.
     *
     * @param actualBalance     Текущий баланс счета.
     * @param costOfTransaction Стоимость транзакции, которую необходимо выполнить.
     */
    public InsufficientFundsException(BigDecimal actualBalance, BigDecimal costOfTransaction) {
        super(String.format("Insufficient funds. Actual balance: %s. Cost of transaction: %s",
                actualBalance, costOfTransaction));
    }
}
