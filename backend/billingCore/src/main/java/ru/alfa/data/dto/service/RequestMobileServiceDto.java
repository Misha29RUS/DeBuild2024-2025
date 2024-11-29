package ru.alfa.data.dto.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.entity.service.enums.ResourceType;
import ru.alfa.data.entity.service.enums.ServiceStatus;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO для передачи данных о мобильной услуге.
 *
 * @param oneTimeService флаг, указывающий, является ли услуга одноразовой.
 * @param status статус услуги, определяемый {@link ServiceStatus}.
 * @param type тип услуги, определяемый {@link ResourceType}.
 * @param name название услуги.
 * @param description описание услуги.
 * @param cost стоимость услуги; должна быть неотрицательной.
 * @param countResources количество ресурсов; должно быть неотрицательным.
 */
public record RequestMobileServiceDto(
        @NotNull(message = "Поле oneTimeService не может быть пустым") Boolean oneTimeService,
        @NotNull(message = "Статус  услуги не может быть пустым") ServiceStatus status,
        @NotNull(message = "Тип услуги не может быть пустым") ResourceType type,
        @NotBlank(message = "Название услуги не может быть пустым") String name,
        @NotBlank(message = "Описание услуги не может быть пустым") String description,
        @NotNull(message = "Стоимость услуги не может быть пустым")
        @PositiveOrZero(message = "Стоимость услуги не должна быть меньше нуля") BigDecimal cost,
        @NotNull(message = "Количество ресурсов не может быть пустым")
        @PositiveOrZero(message = "Количество ресурсом не должно быть меньше нуля")
        Double countResources) implements Serializable {
}