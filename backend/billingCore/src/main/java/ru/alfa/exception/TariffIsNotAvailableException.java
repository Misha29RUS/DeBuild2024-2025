package ru.alfa.exception;

/**
 * Исключение, выбрасываемое при попытке использования недоступного тарифа
 */
public class TariffIsNotAvailableException extends RuntimeException {

    /**
     * Конструктор исключения.
     *
     * @param id   Идентификатор тарифа, который недоступен.
     * @param name Название тарифа, который недоступен.
     */
    public TariffIsNotAvailableException(Long id, String name) {
        super(String.format("Tariff '%s' with id - %d is not available", name, id));
    }
}
