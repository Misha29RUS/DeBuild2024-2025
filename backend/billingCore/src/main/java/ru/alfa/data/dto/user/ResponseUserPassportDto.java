package ru.alfa.data.dto.user;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO для представления информации о паспорте пользователя.
 *
 * @param id             уникальный идентификатор записи паспорта.
 * @param passportSeries серия паспорта.
 * @param passportNumber номер паспорта.
 * @param dateOfBirth    дата рождения пользователя.
 * @param issuedByWhom   организация, выдавшая паспорт.
 * @param departmentCode код подразделения, выдавшего паспорт.
 * @param dateOfIssue    дата выдачи паспорта.
 */
public record ResponseUserPassportDto(Long id, String passportSeries, String passportNumber, LocalDate dateOfBirth,
                                      String issuedByWhom, String departmentCode,
                                      LocalDate dateOfIssue) implements Serializable {
}