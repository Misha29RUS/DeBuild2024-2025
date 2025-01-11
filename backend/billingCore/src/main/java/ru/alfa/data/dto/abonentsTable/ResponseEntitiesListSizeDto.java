package ru.alfa.data.dto.abonentsTable;

/**
 * DTO для передачи информации о количестве абонентов
 * после применения фильтров и общего количества абонентов.
 *
 * @param countEntityAfterFilters количество абонентов после применения фильтров.
 * @param countAllEntities          общее количество абонентов в системе.
 */
public record ResponseEntitiesListSizeDto(Long countEntityAfterFilters, Long countAllEntities) {
}
