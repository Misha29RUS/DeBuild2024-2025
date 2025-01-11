package ru.alfa.data.dto.employee;

import ru.alfa.data.entity.employee.enums.EmployeeRole;

import java.io.Serializable;


public record ResponseEmployeeDto(Long id,
                                  String email,
                                  EmployeeRole role,
                                  String firstName,
                                  String lastName,
                                  String patronymic)
        implements Serializable {
}