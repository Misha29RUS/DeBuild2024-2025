package ru.alfa.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "phone_number_tariff")
public class PhoneNumberTariff {
    @Id
    @Column(name = "phone_number_id", nullable = false)
    private Long id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "phone_number_id", nullable = false)
    private PhoneNumber phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tariff_id")
    private Tariff tariff;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "date_of_start_period")
    private LocalDate dateOfStartPeriod;

    @Column(name = "date_of_end_period")
    private LocalDate dateOfEndPeriod;

    @Column(name = "remaining_minutes")
    private Integer remainingMinutes;

    @Column(name = "\"remaining_SMS\"")
    private Integer remainingSms;

    @Column(name = "\"remaining_Gigabytes\"")
    private Double remainingGigabytes;

    @Column(name = "count_minutes_at_start_of_period")
    private Integer countMinutesAtStartOfPeriod;

    @Column(name = "\"count_SMS_at_start_of_period\"")
    private Integer countSmsAtStartOfPeriod;

    @Column(name = "\"count_Gigabytes_at_start_of_period\"")
    private Double countGigabytesAtStartOfPeriod;

}