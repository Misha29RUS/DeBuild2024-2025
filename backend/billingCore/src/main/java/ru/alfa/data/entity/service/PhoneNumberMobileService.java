package ru.alfa.data.entity.service;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;
import ru.alfa.data.entity.service.enums.ResourceType;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "phone_number_service")
public class PhoneNumberMobileService {
    @EmbeddedId
    private PhoneNumberServiceId id;

    @MapsId("phoneNumberId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "phone_number_id", nullable = false)
    private PhoneNumber phoneNumber;

    @MapsId("serviceId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_id", nullable = false)
    private MobileService mobileService;

    @Column(name = "date_of_start_period")
    private LocalDate dateOfStartPeriod;

    @Column(name = "date_of_end_period")
    private LocalDate dateOfEndPeriod;

    @Column(name = "type_of_resource", columnDefinition = "resource_type")
    @Enumerated(EnumType.STRING)
    private ResourceType type;

    @Column(name = "remaining_resources")
    private Double remainingResources;

}