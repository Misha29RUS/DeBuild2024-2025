package ru.alfa.data.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Паспортные данные пользователя
 */
@Getter
@Setter
@Entity
@Table(name = "user_passport")
public class UserPassport {

    /**
     * Идентификатор паспорта
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
     * Серия паспорта
     */
    @Column(name = "passport_series", length = 4)
    private String passportSeries;

    /**
     * Номер паспорта
     */
    @Column(name = "passport_number", length = 6)
    private String passportNumber;

    /**
     * Дата рождения пользователя
     */
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    /**
     * Указание кем выдан паспорт
     */
    @Column(name = "issued_by_whom", length = Integer.MAX_VALUE)
    private String issuedByWhom;

    /**
     * Код подразделения
     */
    @Column(name = "department_code", length = 6)
    private String departmentCode;

    /**
     * Дата выдачи паспорта
     */
    @Column(name = "date_of_issue")
    private LocalDate dateOfIssue;

}