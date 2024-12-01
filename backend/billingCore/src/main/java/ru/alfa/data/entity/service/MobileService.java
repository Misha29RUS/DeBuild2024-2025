package ru.alfa.data.entity.service;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.service.enums.ResourceType;
import ru.alfa.data.entity.service.enums.ServiceStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Сущность мобильных услуг
 */
@Getter
@Setter
@Entity
@Table(name = "service")
public class MobileService {

    /**
     * Идентификатор мобильной услуги
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id", nullable = false)
    private Long id;

    /**
     * Указатель, является ли услуга одноразовой
     */
    @Column(name = "one_time_service")
    private Boolean oneTimeService;

    /**
     * Тип статуса мобильной услуги
     */
    @Column(name = "status", columnDefinition = "service_status")
    @Enumerated(EnumType.STRING)
    private ServiceStatus status;

    /**
     * Тип ресурса мобильной услуги
     */
    @Column(name = "type_of_resource", columnDefinition = "resource_type")
    @Enumerated(EnumType.STRING)
    private ResourceType type;

    /**
     * Наименование услуги
     */
    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    /**
     * Описание услуги
     */
    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    /**
     * Стоимость услуги
     */
    @Column(name = "cost", precision = 10, scale = 2)
    private BigDecimal cost;

    /**
     * Количество ресурсов (минут, смс, гигабайт)
     */
    @Column(name = "count_resources")
    private Double countResources;

    /**
     * Дата создания мобильной услуги
     */
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    /**
     * Дата обновления мобильной услуги
     */
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Перечень номеров, связанных с мобильной услугой
     */
    @OneToMany(mappedBy = "mobileService")
    private Set<PhoneNumberMobileService> phoneNumberMobileServices = new LinkedHashSet<>();


}