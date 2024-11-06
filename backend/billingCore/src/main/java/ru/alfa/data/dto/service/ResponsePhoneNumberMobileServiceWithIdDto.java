package ru.alfa.data.dto.service;

import ru.alfa.data.entity.service.enums.ResourceType;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link ru.alfa.data.entity.service.PhoneNumberMobileService}
 */
public record ResponsePhoneNumberMobileServiceWithIdDto(ResponsePhoneNumberServiceIdDto id, LocalDate dateOfStartPeriod,
                                                        LocalDate dateOfEndPeriod, ResourceType type,
                                                        Double remainingResources) implements Serializable {
}