package ru.alfa.data.entity.service;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "phone_number_service")
public class PhoneNumberService {
    @EmbeddedId
    private PhoneNumberServiceId id;

    @MapsId("phoneNumberId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "phone_number_id", nullable = false)
    private PhoneNumber phoneNumber;

    @MapsId("serviceId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

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

}