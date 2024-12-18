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

/**
 * Сущность тарифа
 */
@Getter
@Setter
@Entity
@Table(name = "tariff")
public class Tariff {

    /**
     * Идентификатор тарифа
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tariff_id", nullable = false)
    private Long id;

    /**
     * Тип тарифа
     */
    @Column(name = "type", columnDefinition = "tariff_type")
    @Enumerated(EnumType.STRING)
    private TariffType type;

    /**
     * Статус тарифа
     */
    @Column(name = "status", columnDefinition = "tariff_status")
    @Enumerated(EnumType.STRING)
    private TariffStatus status;

    /**
     * Наименование тарифа
     */
    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    /**
     * Описание тарифа
     */
    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    /**
     * Стоимость тарифа
     */
    @Column(name = "cost", precision = 10, scale = 2)
    private BigDecimal cost;

    /**
     * Ресурсы в тарифе
     */
    @OneToOne(mappedBy = "tariff", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private TariffResource tariffResource;

    /**
     * Дата обновления тарифа
     */
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Дата создания тарифа
     */
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * Перечень номеров телефона, которые подключены к тарифу
     */
    @OneToMany(mappedBy = "tariff")
    private Set<PhoneNumberTariff> phoneNumberTariffs = new LinkedHashSet<>();

}