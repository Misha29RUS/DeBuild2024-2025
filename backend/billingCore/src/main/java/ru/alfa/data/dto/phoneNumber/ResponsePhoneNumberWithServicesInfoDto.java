package ru.alfa.data.dto.phoneNumber;

import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceDto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

/**
 * DTO для представления информации о телефонном номере
 * с учетом мобильных услуг.
 *
 * @param id                        уникальный идентификатор записи.
 * @param phoneNumber               номер телефона.
 * @param balance                   текущий баланс телефонного номера.
 * @param phoneNumberMobileServices набор мобильных услуг, связанных с телефонным номером.
 */
public record ResponsePhoneNumberWithServicesInfoDto(Long id, String phoneNumber, BigDecimal balance,
                                                     Set<ResponsePhoneNumberMobileServiceDto> phoneNumberMobileServices)
        implements Serializable {
}