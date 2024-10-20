package ru.alfa.data.entity.service;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.service.enums.ServiceStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "service")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id", nullable = false)
    private Long id;

    @Column(name = "one_time_service")
    private Boolean oneTimeService;

    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "cost", precision = 10, scale = 2)
    private BigDecimal cost;

    @Column(name = "count_minutes")
    private Integer countMinutes;

    @Column(name = "\"count_SMS\"")
    private Integer countSms;

    @Column(name = "\"count_Gigabytes\"")
    private Double countGigabytes;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToMany(mappedBy = "service")
    private Set<PhoneNumberService> phoneNumberServices = new LinkedHashSet<>();

    @Column(name = "status", columnDefinition = "service_status")
    private ServiceStatus status;

}