package ru.alfa.data.dto.service;

import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.entity.service.enums.ResourceType;
import ru.alfa.data.entity.service.enums.ServiceStatus;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link MobileService}
 */
public record ResponseMobileServiceDto(Long id, Boolean oneTimeService, ServiceStatus status, ResourceType type,
                                       String name, String description, BigDecimal cost,
                                       Double countResources) implements Serializable {
}