package ru.alfa.controller.service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alfa.data.dto.abonentsTable.ResponseEntitiesListSizeDto;
import ru.alfa.data.dto.service.RequestFiltersForServiceTableDto;
import ru.alfa.data.dto.service.ResponseMobileServiceDto;
import ru.alfa.service.service.ServiceTableService;

/**
 * Контроллер для вывода таблицы сервисов с фильтрами
 */
@Tag(name = "Контроллер вывода таблицы сервисы с фильтрами")
@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@Validated
public class ServiceTableController {

    /**
     * Сервис для работы с таблицей мобильных услуг
     */
    private final ServiceTableService serviceTableService;

    /**
     * Получает список мобильных услуг с применением фильтров и пагинации.
     *
     * @param page                             Номер страницы (0 - первая страница).
     * @param size                             Размер страницы (количество элементов на странице).
     * @param requestFiltersForServiceTableDto DTO с фильтрами для поиска мобильных услуг.
     * @return Страница DTO мобильных услуг, соответствующих заданным фильтрам.
     */
    @PostMapping
    public ResponseEntity<Page<ResponseMobileServiceDto>> getServiceWithFilters(
            @Parameter(name = "page", description = "Номер страницы", example = "0")
            @NotNull @PositiveOrZero @RequestParam(value = "page", defaultValue = "0") Integer page,
            @Parameter(name = "size", description = "Размер страницы", example = "10")
            @NotNull @PositiveOrZero @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestBody @Validated RequestFiltersForServiceTableDto requestFiltersForServiceTableDto) {
        Page<ResponseMobileServiceDto> responseServiceDtoPage =
                serviceTableService.getServicesWithFilters(page, size, requestFiltersForServiceTableDto);

        return ResponseEntity.ok(responseServiceDtoPage);
    }

    /**
     * Получает количество всех услуг и количество отфильтрованных услуг.
     *
     * @param requestFiltersForServiceTableDto DTO с фильтрами для поиска услуг.
     * @return DTO с количеством всех услуг и количеством отфильтрованных услуг.
     */
    @Operation(
            summary = "Получить количество всех услуг и отфильтрованных",
            description = "Возвращает количество всех услуг и количество услуг подходящих под фильтры."
    )
    @PostMapping("/count")
    public ResponseEntity<ResponseEntitiesListSizeDto> getServiceListSizeWithFilters(
            @RequestBody @Validated RequestFiltersForServiceTableDto requestFiltersForServiceTableDto) {
        ResponseEntitiesListSizeDto responseEntitiesListSizeDto =
                serviceTableService.getServicesListSizeWithFilters(requestFiltersForServiceTableDto);

        return ResponseEntity.ok(responseEntitiesListSizeDto);
    }

}