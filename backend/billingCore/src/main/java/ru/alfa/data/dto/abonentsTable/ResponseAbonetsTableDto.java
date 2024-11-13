package ru.alfa.data.dto.abonentsTable;

import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceDto;
import ru.alfa.data.dto.tariff.ResponseWithTariffPhoneNumberTariffDto;
import ru.alfa.data.dto.user.ResponseUserDto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

public record ResponseAbonetsTableDto(Long id, String phoneNumber, BigDecimal balance, ResponseUserDto user,
                                      ResponseWithTariffPhoneNumberTariffDto phoneNumberTariff,
                                      Set<ResponsePhoneNumberMobileServiceDto> phoneNumberMobileServices
) implements Serializable {
}
