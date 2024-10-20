package ru.alfa.data.entity.employee;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.employee.enums.EmployeeRole;

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


    @Column(name = "role", columnDefinition = "employee_role")
    private EmployeeRole role;

}