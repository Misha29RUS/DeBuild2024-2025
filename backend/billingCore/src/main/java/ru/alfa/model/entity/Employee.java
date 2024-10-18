package ru.alfa.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id", nullable = false)
    private Long id;

    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "surname", length = Integer.MAX_VALUE)
    private String surname;

    @Column(name = "patronymic", length = Integer.MAX_VALUE)
    private String patronymic;
    @OneToOne(mappedBy = "employee")
    private EmployeesCredential employeesCredential;

/*
 TODO [Reverse Engineering] create field to map the 'role' column
 Available actions: Define target Java type | Uncomment as is | Remove column mapping
    @Column(name = "role", columnDefinition = "employee_role")
    private Object role;
*/
}