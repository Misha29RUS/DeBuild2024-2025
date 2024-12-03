package ru.alfa.data.dto.tariff;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO для представления информации о ресурсах тарифа.
 *
 * @param id              уникальный идентификатор ресурса тарифа.
 * @param countMinutes    количество минут, предоставляемых тарифом.
 * @param costOneMinute   стоимость одной минуты.
 * @param stepsMinutes    список шагов для минут (например, пороги использования).
 * @param countSms        количество SMS, предоставляемых тарифом.
 * @param costOneSms      стоимость одного SMS.
 * @param stepsSms        список шагов для SMS (например, пороги использования).
 * @param countGigabytes  количество гигабайтов, предоставляемых тарифом.
 * @param costOneGigabyte стоимость одного гигабайта.
 * @param stepsGigabytes  список шагов для гигабайтов (например, пороги использования).
 */
public record ResponseTariffResourceDto(Long id, Integer countMinutes, BigDecimal costOneMinute,
                                        List<Integer> stepsMinutes, Integer countSms, BigDecimal costOneSms,
                                        List<Integer> stepsSms, Double countGigabytes, BigDecimal costOneGigabyte,
                                        List<Integer> stepsGigabytes) implements Serializable {
}