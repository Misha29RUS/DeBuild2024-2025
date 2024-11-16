package ru.alfa.data.dto.service;

import ru.alfa.data.entity.service.enums.ResourceType;

import java.io.Serializable;

public record RequestFiltersForServiceTableDto(Boolean oneTimeService, ResourceType type, String name)
        implements Serializable {
}
