package ru.alfa.data.dto.service;

import java.io.Serializable;

/**
 * DTO для представления идентификаторов телефонного номера
 * и связанной с ним услуги.
 *
 * @param phoneNumberId уникальный идентификатор телефонного номера.
 * @param serviceId     уникальный идентификатор услуги, связанной с телефонным номером.
 */
public record ResponsePhoneNumberServiceIdDto(Long phoneNumberId, Long serviceId) implements Serializable {
}