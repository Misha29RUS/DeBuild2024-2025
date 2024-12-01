package ru.alfa.data.entity.employee;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Учетные данные сотрудника
 */
@Getter
@Setter
@Entity
@Table(name = "employees_credentials")
public class EmployeesCredential {

    /**
     * Идентификатор
     */
    @Id
    @Column(name = "employee_id", nullable = false)
    private Long id;

    /**
     * Сотрудник
     */
    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    /**
     * Электронная почта сотрудника
     */
    @Column(name = "email", length = Integer.MAX_VALUE)
    private String email;

    /**
     * Захешированный пароль
     */
    @Column(name = "password_hash", length = Integer.MAX_VALUE)
    private String passwordHash;

    /**
     * Дата создания учетной записи
     */
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * Дата обновления учетной записи
     */
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Указатель, является ли учетная запись активной
     */
    @Column(name = "is_active")
    private Boolean isActive;

}