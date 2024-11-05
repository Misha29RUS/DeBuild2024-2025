package ru.alfa.data.dto.user;

import java.io.Serializable;

/**
 * DTO for {@link ru.alfa.data.entity.user.User}
 */
public record ResponseUserWithPassportDto(Long id, String name, String surname, String patronymic,
                                          ResponseUserPassportDto userPassport) implements Serializable {
}