package ru.alfa.data.dto.service;

import java.io.Serializable;

/**
 * DTO for {@link ru.alfa.data.entity.service.PhoneNumberServiceId}
 */
public record ResponsePhoneNumberServiceIdDto(Long phoneNumberId, Long serviceId) implements Serializable {
}