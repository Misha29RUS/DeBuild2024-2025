package ru.alfa.data.dto.abonentsTable;

import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceDto;
import ru.alfa.data.dto.tariff.ResponseWithTariffPhoneNumberTariffDto;
import ru.alfa.data.dto.user.ResponseUserDto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

/**
 * DTO для представления информации об абоненте
 * в таблице абонентов.
 *
 * @param id                        уникальный идентификатор абонента.
 * @param phoneNumber               номер телефона абонента.
 * @param balance                   текущий баланс абонента.
 * @param user                      информация о пользователе, связанная с абонентом.
 * @param phoneNumberTariff         информация о тарифе, применяемом к номеру телефона.
 * @param phoneNumberMobileServices набор мобильных услуг, связанных с номером телефона.
 */
public record ResponseAbonetsTableDto(Long id, String phoneNumber, BigDecimal balance, ResponseUserDto user,
                                      ResponseWithTariffPhoneNumberTariffDto phoneNumberTariff,
                                      Set<ResponsePhoneNumberMobileServiceDto> phoneNumberMobileServices
) implements Serializable {
}
