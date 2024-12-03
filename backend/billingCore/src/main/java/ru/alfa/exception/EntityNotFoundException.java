package ru.alfa.exception;

/**
 * Исключение, выбрасываемое при отсутствии сущности в базе данных
 */
public class EntityNotFoundException extends RuntimeException {

    /**
     * Конструктор исключения.
     *
     * @param entity Название сущности, которая не была найдена.
     * @param id     Идентификатор сущности, которая не была найдена.
     */
    public EntityNotFoundException(String entity, Long id) {
        super(entity + " with id " + id + " not found");
    }
}
