package ru.alfa.data.dto.tariff;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO for {@link ru.alfa.data.entity.tariff.TariffResource}
 */
public record RequestTariffResourceDto(@NotNull(message = "Количество минут не может быть пустым")
                                       @PositiveOrZero(message = "Количество минут не должно быть меньше нуля")
                                       Integer countMinutes,
                                       @NotNull(message = "Стоимость минуты не может быть пустым")
                                       @PositiveOrZero(message = "Стоимость минуты не должна быть меньше нуля")
                                       BigDecimal costOneMinute,
                                       List<Integer> stepsMinutes,
                                       @NotNull(message = "Количество SMS не может быть пустым")
                                       @PositiveOrZero(message = "Количество SMS не должно быть меньше нуля")
                                       Integer countSms,
                                       @NotNull(message = "Стоимость SMS не может быть пустым")
                                       @PositiveOrZero(message = "Стоимость SMS не должна быть меньше нуля")
                                       BigDecimal costOneSms,
                                       List<Integer> stepsSms,
                                       @NotNull(message = "Количество ГБ не может быть пустым")
                                       @PositiveOrZero(message = "Количество ГБ не должно быть меньше нуля")
                                       Double countGigabytes,
                                       @NotNull(message = "Стоимость ГБ не может быть пустым")
                                       @PositiveOrZero(message = "Стоимость ГБ не должна быть меньше нуля")
                                       BigDecimal costOneGigabyte,
                                       List<Integer> stepsGigabytes) implements Serializable {
}