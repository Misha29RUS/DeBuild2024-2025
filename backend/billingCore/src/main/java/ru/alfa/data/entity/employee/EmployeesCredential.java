package ru.alfa.data.entity.employee;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.alfa.data.entity.employee.enums.EmployeeRole;
import ru.alfa.data.entity.employee.enums.EmployeeStatus;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

/**
 * Учетные данные сотрудника
 */
@Getter
@Setter
@Entity
@Builder
@Table(name = "employees_credentials")
@NoArgsConstructor
@AllArgsConstructor
public class EmployeesCredential implements UserDetails {

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
     * Роль сотрудника
     */
    @Column(name = "role", columnDefinition = "employee_role")
    @Enumerated(EnumType.STRING)
    private EmployeeRole role;

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


    @Column(name = "status", columnDefinition = "employee_status")
    @Enumerated(EnumType.STRING)
    private EmployeeStatus status;

    /**
     * Returns the authorities granted to the user. Cannot return <code>null</code>.
     *
     * @return the authorities, sorted by natural key (never <code>null</code>)
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * @return the password
     */
    @Override
    public String getPassword() {
        return this.passwordHash;
    }

    /**
     * Returns the username used to authenticate the user. Cannot return
     * <code>null</code>.
     *
     * @return the username (never <code>null</code>)
     */
    @Override
    public String getUsername() {
        return this.email;
    }
}