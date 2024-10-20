package ru.alfa.data.entity.tariff;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.tariff.enums.TariffStatus;
import ru.alfa.data.entity.tariff.enums.TariffType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "tariff")
public class Tariff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tariff_id", nullable = false)
    private Long id;

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

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "created_at")
    private Instant createdAt;

    @OneToMany(mappedBy = "tariff")
    private Set<PhoneNumberTariff> phoneNumberTariffs = new LinkedHashSet<>();


    @Column(name = "type", columnDefinition = "tariff_type")
    private TariffType type;


    @Column(name = "status", columnDefinition = "tariff_status")
    private TariffStatus status;

}