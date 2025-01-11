package ru.alfa.data.dto.service;

import ru.alfa.data.entity.service.enums.ResourceType;

import java.io.Serializable;

/**
 * DTO для передачи фильтров, используемых при запросе
 * данных о сервисах в таблице.
 *
 * @param oneTimeService флаг, указывающий, является ли сервис одноразовым.
 * @param type           тип ресурса, определяемый {@link ResourceType}.
 * @param name           имя сервиса.
 */
public record RequestFiltersForServiceTableDto(Boolean oneTimeService, ResourceType type, String name)
        implements Serializable {
}
