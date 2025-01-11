package ru.alfa.data.dto.phoneNumber;

import ru.alfa.data.dto.tariff.ResponseWithTariffPhoneNumberTariffDto;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO для представления информации о телефонном номере
 * с учетом тарифной информации.
 *
 * @param id                уникальный идентификатор записи.
 * @param phoneNumber       номер телефона.
 * @param balance           текущий баланс телефонного номера.
 * @param phoneNumberTariff информация о тарифе, применяемом к номеру телефона.
 */
public record ResponsePhoneNumberWithTariffInfoDto(Long id, String phoneNumber, BigDecimal balance,
                                                   ResponseWithTariffPhoneNumberTariffDto phoneNumberTariff)
        implements Serializable {
}