package ru.alfa.data.dto.employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.alfa.data.entity.employee.enums.EmployeeRole;

import java.io.Serializable;


public record RequestEmployeeDto(@NotNull @Email @NotEmpty String email,
                                 @NotNull EmployeeRole role,
                                 @NotBlank(message = "First name can't be blank") String firstName,
                                 @NotBlank(message = "Last name can't be blank") String lastName,
                                 @NotBlank(message = "Patronymic name can't be blank") String patronymic
) implements Serializable {
}