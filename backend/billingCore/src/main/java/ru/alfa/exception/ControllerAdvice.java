package ru.alfa.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * Обработчик исключений для контроллеров.
 */
@RestControllerAdvice
public class ControllerAdvice {

    /**
     * Обрабатывает исключения валидации, возникающие при неверных аргументах метода.
     *
     * @param ex Исключение, содержащее информацию о валидации.
     * @return Карта с полями и сообщениями об ошибках валидации.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));
        return errors;
    }

    /**
     * Обрабатывает исключения нарушения ограничений (Constraint Violations).
     *
     * @param ex Исключение, содержащее информацию о нарушениях ограничений.
     * @return Карта с полями и сообщениями о нарушениях ограничений.
     */
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleConstraintViolationException(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getConstraintViolations().forEach(violation ->
                errors.put(violation.getPropertyPath().toString(), violation.getMessage()));
        return errors;
    }

    /**
     * Обрабатывает исключения, связанные с отсутствующими сущностями.
     *
     * @param ex Исключение, содержащее информацию об отсутствии сущности.
     * @return Карта с сообщением об ошибке.
     */
    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleEntityNotFoundException(EntityNotFoundException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", ex.getMessage());
        return errors;
    }

    /**
     * Обрабатывает исключения недостатка средств.
     *
     * @param ex Исключение, содержащее сообщение о недостатке средств.
     * @return Сообщение об ошибке.
     */
    @ExceptionHandler(InsufficientFundsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleInsufficientFundsException(InsufficientFundsException ex) {
        return ex.getMessage();
    }

    /**
     * Обрабатывает исключения недоступности тарифа.
     *
     * @param ex Исключение, содержащее сообщение о недоступности тарифа.
     * @return Сообщение об ошибке.
     */
    @ExceptionHandler(TariffIsNotAvailableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handlerTariffIsNotAvailableException(TariffIsNotAvailableException ex) {
        return ex.getMessage();
    }
}
