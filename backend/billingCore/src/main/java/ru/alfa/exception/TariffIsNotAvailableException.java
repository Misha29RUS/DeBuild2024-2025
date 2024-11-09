package ru.alfa.exception;

public class TariffIsNotAvailableException extends RuntimeException {

    public TariffIsNotAvailableException(Long id, String name) {
        super(String.format("Tariff '%s' with id - %d is not available", name, id));
    }
}
