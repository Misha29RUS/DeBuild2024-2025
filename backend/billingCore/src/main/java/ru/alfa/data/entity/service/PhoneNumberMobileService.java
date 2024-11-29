package ru.alfa.data.entity.service;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;
import ru.alfa.data.entity.service.enums.ResourceType;

import java.time.LocalDate;

/**
 * Смежная сущность {@link PhoneNumber} и {@link MobileService}
 */
@Getter
@Setter
@Entity
@Table(name = "phone_number_service")
public class PhoneNumberMobileService {

    /**
     * Идентификатор
     */
    @EmbeddedId
    private PhoneNumberServiceId id;

    /**
     * Номер телефона
     */
    @MapsId("phoneNumberId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "phone_number_id", nullable = false)
    private PhoneNumber phoneNumber;

    /**
     * Подключенная мобильная услуга
     */
    @MapsId("serviceId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_id", nullable = false)
    private MobileService mobileService;

    /**
     * Дата старта периода мобильной услуги
     */
    @Column(name = "date_of_start_period")
    private LocalDate dateOfStartPeriod;

    /**
     * Дата окончания периода мобильной услуги
     */
    @Column(name = "date_of_end_period")
    private LocalDate dateOfEndPeriod;

    /**
     * Тип ресурса мобильной услуги
     */
    @Column(name = "type_of_resource", columnDefinition = "resource_type")
    @Enumerated(EnumType.STRING)
    private ResourceType type;

    /**
     * Остаток количества ресурса
     */
    @Column(name = "remaining_resources")
    private Double remainingResources;

}