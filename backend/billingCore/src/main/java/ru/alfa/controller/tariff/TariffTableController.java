package ru.alfa.controller.tariff;

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
import ru.alfa.data.dto.tariff.RequestFiltersForTariffsTableDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.service.tariff.TariffTableService;

/**
 * Контроллер для вывода таблицы тарифов с фильтрами
 */
@Tag(name = "Контроллер вывода таблицы тарифов с фильтрами")
@RestController
@RequestMapping("/api/tariffs")
@RequiredArgsConstructor
@Validated
public class TariffTableController {

    /**
     * Сервис для работы с таблицей тарифов
     */
    private final TariffTableService tariffTableService;

    /**
     * Получает тарифы, соответствующие заданным фильтрам.
     *
     * @param page                             Номер страницы (0 - первая страница).
     * @param size                             Размер страницы (количество элементов на странице).
     * @param requestFiltersForTariffsTableDto DTO с фильтрами для поиска тарифов.
     * @return Страница DTO тарифов, соответствующих заданным фильтрам.
     */
    @Operation(
            summary = "Получить отфильтрованные тарифы",
            description = "Возвращает тарифы, которые соответствуют заданным фильтрам."
    )
    @PostMapping
    public ResponseEntity<Page<ResponseTariffDto>> getTariffWithFilters(
            @Parameter(name = "page", description = "Номер страницы", example = "0")
            @NotNull @PositiveOrZero @RequestParam(value = "page", defaultValue = "0") Integer page,
            @Parameter(name = "size", description = "Размер страницы", example = "10")
            @NotNull @PositiveOrZero @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestBody @Validated RequestFiltersForTariffsTableDto requestFiltersForTariffsTableDto) {
        Page<ResponseTariffDto> responseTariffDtoPage =
                tariffTableService.getTariffsWithFilters(page, size, requestFiltersForTariffsTableDto);

        return ResponseEntity.ok(responseTariffDtoPage);
    }

    /**
     * Получает количество всех тарифов и количество отфильтрованных тарифов.
     *
     * @param requestFiltersForTariffsTableDto DTO с фильтрами для поиска тарифов.
     * @return DTO с количеством всех тарифов и количеством отфильтрованных тарифов.
     */
    @Operation(
            summary = "Получить количество всех тарифов и отфильтрованных",
            description = "Возвращает количество всех тарифов и количество тарифов подходящих под фильтры."
    )
    @PostMapping("/count")
    public ResponseEntity<ResponseEntitiesListSizeDto> getServiceListSizeWithFilters(
            @RequestBody @Validated RequestFiltersForTariffsTableDto requestFiltersForTariffsTableDto) {
        ResponseEntitiesListSizeDto responseEntitiesListSizeDto =
                tariffTableService.getServicesListSizeWithFilters(requestFiltersForTariffsTableDto);

        return ResponseEntity.ok(responseEntitiesListSizeDto);
    }

}
