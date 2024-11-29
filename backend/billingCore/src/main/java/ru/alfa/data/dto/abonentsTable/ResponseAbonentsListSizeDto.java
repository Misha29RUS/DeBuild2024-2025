package ru.alfa.data.dto.abonentsTable;

/**
 * DTO для передачи информации о количестве абонентов
 * после применения фильтров и общего количества абонентов.
 *
 * @param countAbonentsAfterFilters количество абонентов после применения фильтров.
 * @param countAllAbonents общее количество абонентов в системе.
 */
public record ResponseAbonentsListSizeDto(Long countAbonentsAfterFilters, Long countAllAbonents) {
}
