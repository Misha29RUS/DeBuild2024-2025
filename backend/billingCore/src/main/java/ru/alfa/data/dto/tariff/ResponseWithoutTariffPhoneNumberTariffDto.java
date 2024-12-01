package ru.alfa.data.dto.tariff;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO для представления информации о тарифе телефонного номера
 * без привязки к конкретному тарифу.
 *
 * @param id уникальный идентификатор записи.
 * @param isActive флаг, указывающий, активен ли тариф.
 * @param dateOfStartPeriod дата начала периода действия тарифа.
 * @param dateOfEndPeriod дата окончания периода действия тарифа.
 * @param remainingMinutes количество оставшихся минут.
 * @param remainingSms количество оставшихся SMS.
 * @param remainingGigabytes количество оставшихся гигабайтов.
 * @param countMinutesAtStartOfPeriod количество минут на начало периода.
 * @param countSmsAtStartOfPeriod количество SMS на начало периода.
 * @param countGigabytesAtStartOfPeriod количество гигабайтов на начало периода.
 */
public record ResponseWithoutTariffPhoneNumberTariffDto(Long id, Boolean isActive, LocalDate dateOfStartPeriod,
                                                        LocalDate dateOfEndPeriod,
                                                        Integer remainingMinutes, Integer remainingSms,
                                                        Double remainingGigabytes,
                                                        Integer countMinutesAtStartOfPeriod,
                                                        Integer countSmsAtStartOfPeriod,
                                                        Double countGigabytesAtStartOfPeriod) implements Serializable {
}