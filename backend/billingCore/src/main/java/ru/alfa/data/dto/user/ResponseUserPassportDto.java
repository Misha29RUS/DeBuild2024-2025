package ru.alfa.data.dto.user;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link ru.alfa.data.entity.user.UserPassport}
 */
public record ResponseUserPassportDto(Long id, String passportSeries, String passportNumber, LocalDate dateOfBirth,
                                      String issuedByWhom, String departmentCode,
                                      LocalDate dateOfIssue) implements Serializable {
}