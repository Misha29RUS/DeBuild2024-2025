package ru.alfa.data.dto.service;

import ru.alfa.data.entity.service.enums.ResourceType;
import ru.alfa.data.entity.service.enums.ServiceStatus;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO для представления информации о мобильной услуге.
 *
 * @param id             уникальный идентификатор мобильной услуги.
 * @param oneTimeService флаг, указывающий, является ли услуга одноразовой.
 * @param status         статус услуги, определяемый {@link ServiceStatus}.
 * @param type           тип услуги, определяемый {@link ResourceType}.
 * @param name           название услуги.
 * @param description    описание услуги.
 * @param cost           стоимость услуги.
 * @param countResources количество ресурсов, связанных с услугой.
 */
public record ResponseMobileServiceDto(Long id, Boolean oneTimeService, ServiceStatus status, ResourceType type,
                                       String name, String description, BigDecimal cost,
                                       Double countResources) implements Serializable {
}