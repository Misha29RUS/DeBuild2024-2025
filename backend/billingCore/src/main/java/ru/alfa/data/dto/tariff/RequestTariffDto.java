package ru.alfa.data.dto.tariff;

import jakarta.validation.Valid;
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
                               @NotNull(message = "Ресурс тарифа не может быть пустым") @Valid
                               RequestTariffResourceDto tariffResourceDto) implements Serializable {
}