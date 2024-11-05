package ru.alfa.data.entity.tariff;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.tariff.enums.TariffStatus;
import ru.alfa.data.entity.tariff.enums.TariffType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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

    @Column(name = "type", columnDefinition = "tariff_type")
    @Enumerated(EnumType.STRING)
    private TariffType type;

    @Column(name = "status", columnDefinition = "tariff_status")
    @Enumerated(EnumType.STRING)
    private TariffStatus status;

    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "cost", precision = 10, scale = 2)
    private BigDecimal cost;

    @OneToOne(mappedBy = "tariff", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private TariffResource tariffResource;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "tariff")
    private Set<PhoneNumberTariff> phoneNumberTariffs = new LinkedHashSet<>();

}