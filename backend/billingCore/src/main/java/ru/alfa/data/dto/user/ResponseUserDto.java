package ru.alfa.data.dto.user;

import java.io.Serializable;

/**
 * DTO для представления информации о пользователе.
 *
 * @param id уникальный идентификатор пользователя.
 * @param name имя пользователя.
 * @param surname фамилия пользователя.
 * @param patronymic отчество пользователя.
 */
public record ResponseUserDto(Long id, String name, String surname, String patronymic) implements Serializable {
}
