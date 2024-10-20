package ru.alfa.data.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "user_passport")
public class UserPassport {
    @Id
    @Column(name = "user_id", nullable = false)
    private Long id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "passport_series", length = 4)
    private String passportSeries;

    @Column(name = "passport_number", length = 6)
    private String passportNumber;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "issued_by_whom", length = Integer.MAX_VALUE)
    private String issuedByWhom;

    @Column(name = "department_code", length = 6)
    private String departmentCode;

    @Column(name = "date_of_issue")
    private LocalDate dateOfIssue;

}