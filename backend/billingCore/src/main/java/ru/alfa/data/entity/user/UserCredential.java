package ru.alfa.data.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Учетная запись пользователя
 */
@Getter
@Setter
@Entity
@Table(name = "user_credentials")
public class UserCredential {

    /**
     * Идентификатор учетной записи
     */
    @Id
    @Column(name = "user_id", nullable = false)
    private Long id;

    /**
     * Пользователь
     */
    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * Номер телефона
     */
    @Column(name = "phone_number", length = Integer.MAX_VALUE)
    private String phoneNumber;

    /**
     * Хэшированный пароль
     */
    @Column(name = "password_hash", length = Integer.MAX_VALUE)
    private String passwordHash;

    /**
     * Дата создания учетной записи
     */
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * Дата обновления учетной записи
     */
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Указатель, активна ли учетная запись
     */
    @Column(name = "is_active")
    private Boolean isActive;

}