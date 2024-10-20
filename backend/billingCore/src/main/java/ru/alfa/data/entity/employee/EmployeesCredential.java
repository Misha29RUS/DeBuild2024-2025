package ru.alfa.data.entity.employee;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "employees_credentials")
public class EmployeesCredential {
    @Id
    @Column(name = "employee_id", nullable = false)
    private Long id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "email", length = Integer.MAX_VALUE)
    private String email;

    @Column(name = "password_hash", length = Integer.MAX_VALUE)
    private String passwordHash;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "is_active")
    private Boolean isActive;

}