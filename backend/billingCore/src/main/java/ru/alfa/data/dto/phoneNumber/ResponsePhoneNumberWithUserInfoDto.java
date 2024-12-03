package ru.alfa.data.dto.phoneNumber;

import ru.alfa.data.dto.user.ResponseUserWithPassportDto;

import java.io.Serializable;

/**
 * DTO для представления информации о телефонном номере
 * с учетом информации о пользователе.
 *
 * @param id          уникальный идентификатор записи.
 * @param phoneNumber номер телефона.
 * @param user        информация о пользователе, связанная с телефонным номером,
 *                    включая паспортные данные.
 */
public record ResponsePhoneNumberWithUserInfoDto(Long id, String phoneNumber,
                                                 ResponseUserWithPassportDto user) implements Serializable {
}