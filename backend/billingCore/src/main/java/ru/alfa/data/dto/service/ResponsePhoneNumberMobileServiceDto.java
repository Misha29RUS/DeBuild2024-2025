package ru.alfa.data.dto.service;

import ru.alfa.data.entity.service.enums.ResourceType;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO для представления информации о мобильной услуге,
 * связанной с телефонным номером.
 *
 * @param mobileService      информация о мобильной услуге, определяемая {@link ResponseMobileServiceDto}.
 * @param dateOfStartPeriod  дата начала периода действия услуги.
 * @param dateOfEndPeriod    дата окончания периода действия услуги.
 * @param type               тип ресурса, определяемый {@link ResourceType}.
 * @param remainingResources количество оставшихся ресурсов для данной услуги.
 */
public record ResponsePhoneNumberMobileServiceDto(ResponseMobileServiceDto mobileService, LocalDate dateOfStartPeriod,
                                                  LocalDate dateOfEndPeriod, ResourceType type,
                                                  Double remainingResources) implements Serializable {
}