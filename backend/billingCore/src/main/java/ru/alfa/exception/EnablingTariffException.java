package ru.alfa.exception;

/**
 * Исключение, выбрасываемое при ошибке во время подключения тарифа
 */
public class EnablingTariffException extends RuntimeException {

    /**
     * Конструктор исключения.
     *
     * @param id   Идентификатор тарифа, который недоступен.
     * @param message сообщение об ошибке.
     */
    public EnablingTariffException(Long id, String message) {
        super(String.format("Error with enabling the tariff with id %d: %s", id, message));
    }
}
