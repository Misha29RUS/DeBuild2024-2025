package ru.alfa.data.dto.tariff;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import ru.alfa.data.entity.tariff.enums.TariffStatus;
import ru.alfa.data.entity.tariff.enums.TariffType;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link ru.alfa.data.entity.tariff.Tariff}
 */
public record RequestTariffDto(@NotNull(message = "Тип тарифа не может быть пустым") TariffType type,
                               @NotNull(message = "Статус тарифа не может быть пустым") TariffStatus status,
                               @NotBlank(message = "Название тарифа не может быть пустым") String name,
                               @NotBlank(message = "Описание тарифа не может быть пустым") String description,
                               @NotNull(message = "Стоимость тарифа не может быть пустым")
                               @PositiveOrZero(message = "Стоимость тарифа не должна быть меньше нуля")
                               BigDecimal cost,
                               @NotNull(message = "Количество минут не может быть пустым")
                               @PositiveOrZero(message = "Количество минут не должно быть меньше нуля")
                               Integer countMinutes,
                               @NotNull(message = "Количество SMS не может быть пустым")
                               @PositiveOrZero(message = "Количество SMS не должно быть меньше нуля")
                               Integer countSms,
                               @NotNull(message = "Количество ГБ не может быть пустым")
                               @PositiveOrZero(message = "Количество ГБ не должно быть меньше нуля")
                               Double countGigabytes) implements Serializable {
}