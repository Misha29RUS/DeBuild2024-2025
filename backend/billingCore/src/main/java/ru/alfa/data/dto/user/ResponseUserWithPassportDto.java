package ru.alfa.data.dto.user;

import java.io.Serializable;

/**
 * DTO для представления информации о пользователе с данными паспорта.
 *
 * @param id уникальный идентификатор пользователя.
 * @param name имя пользователя.
 * @param surname фамилия пользователя.
 * @param patronymic отчество пользователя.
 * @param userPassport информация о паспорте пользователя, определяемая {@link ResponseUserPassportDto}.
 */
public record ResponseUserWithPassportDto(Long id, String name, String surname, String patronymic,
                                          ResponseUserPassportDto userPassport) implements Serializable {
}