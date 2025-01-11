package ru.alfa.data.dto.security.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.alfa.data.entity.employee.enums.EmployeeRole;
import ru.alfa.data.entity.employee.enums.EmployeeStatus;

/**
 * Класс, представляющий профиль пользователя
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    /**
     * Уникальный идентификатор пользователя.
     * Используется для однозначной идентификации пользователя в системе.
     */
    private Long id;

    /**
     * Адрес электронной почты пользователя.
     * Используется для аутентификации и связи с пользователем.
     */
    private String email;

    /**
     * Роль пользователя в системе.
     * Определяет права доступа и функциональность, доступные пользователю.
     */
    private EmployeeRole role;

    private String name;

    private String surname;

    private String patronymic;
    /**
     * Статус официальной активации пользователя.
     * True, если пользователь официально активирован; иначе false.
     */
    private EmployeeStatus employeeStatus;
}
