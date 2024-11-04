package ru.alfa.data.dto.phoneNumber;

import ru.alfa.data.dto.user.ResponseUserWithPassportDto;

import java.io.Serializable;

/**
 * DTO for {@link ru.alfa.data.entity.phoneNumber.PhoneNumber}
 */
public record ResponsePhoneNumberWithUserInfoDto(Long id, String phoneNumber,
                                                 ResponseUserWithPassportDto user) implements Serializable {
}