package ru.alfa.data.entity.employee;

import jakarta.persistence.*;
import lombok.*;

/**
 * Сущность сотрудник
 */
@Getter
@Setter
@Entity
@Builder
@Table(name = "employee")
@NoArgsConstructor
@AllArgsConstructor
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
    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
    private EmployeesCredential employeesCredential;

}