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

@Getter
@Setter
@Entity
@Table(name = "service")
public class MobileService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id", nullable = false)
    private Long id;

    @Column(name = "one_time_service")
    private Boolean oneTimeService;

    @Column(name = "status", columnDefinition = "service_status")
    @Enumerated(EnumType.STRING)
    private ServiceStatus status;

    @Column(name = "type_of_resource", columnDefinition = "resource_type")
    @Enumerated(EnumType.STRING)
    private ResourceType type;

    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "cost", precision = 10, scale = 2)
    private BigDecimal cost;

    @Column(name = "count_resources")
    private Double countResources;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "mobileService")
    private Set<PhoneNumberMobileService> phoneNumberMobileServices = new LinkedHashSet<>();


}