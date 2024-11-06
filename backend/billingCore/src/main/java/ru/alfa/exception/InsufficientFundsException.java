package ru.alfa.exception;

import java.math.BigDecimal;

public class InsufficientFundsException extends RuntimeException {

    public InsufficientFundsException(BigDecimal actualBalance, BigDecimal costOfTransaction) {
        super(String.format("Insufficient funds. Actual balance: %s. Cost of transaction: %s",
                actualBalance, costOfTransaction));
    }
}
