package ru.alfa.data.entity.employee;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.employee.enums.EmployeeRole;

/**
 * Сущность сотрудник
 */
@Getter
@Setter
@Entity
@Table(name = "employee")
public class Employee {

    /**
     * Идентификатор
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id", nullable = false)
    private Long id;

    /**
     * Имя сотрудника
     */
    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    /**
     * Фамилия сотрудника
     */
    @Column(name = "surname", length = Integer.MAX_VALUE)
    private String surname;

    /**
     * Отчество сотрудника
     */
    @Column(name = "patronymic", length = Integer.MAX_VALUE)
    private String patronymic;

    /**
     * Учетные данные сотрудника
     */
    @OneToOne(mappedBy = "employee")
    private EmployeesCredential employeesCredential;

    /**
     * Роль сотрудника
     */
    @Column(name = "role", columnDefinition = "employee_role")
    @Enumerated(EnumType.STRING)
    private EmployeeRole role;

}