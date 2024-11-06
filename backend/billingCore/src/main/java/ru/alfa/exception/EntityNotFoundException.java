package ru.alfa.exception;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(String entity, Long id) {
        super(entity + " with id " + id + " not found");
    }
}
