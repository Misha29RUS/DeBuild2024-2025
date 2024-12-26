package ru.alfa.exception;

/**
 * Исключение, когда при создании есть такой тариф или услуга или еще что-то
 */
public class CreateException extends RuntimeException{

    /**
     * Конструктор исключения.
     * @param message сообщение об ошибке.
     */
    public CreateException(String message) {
        super(message);
    }
}
