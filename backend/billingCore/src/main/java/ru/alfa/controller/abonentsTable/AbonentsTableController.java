package ru.alfa.controller.abonentsTable;

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
import ru.alfa.data.dto.abonentsTable.RequestFiltersForAbonentsTableDto;
import ru.alfa.data.dto.abonentsTable.ResponseAbonentsListSizeDto;
import ru.alfa.data.dto.abonentsTable.ResponseAbonetsTableDto;
import ru.alfa.service.abonentsTable.AbonentsTableService;

@Tag(name = "Контроллер вывода таблицы абонентов с фильтрами")
@RestController
@RequestMapping("/api/abonents")
@RequiredArgsConstructor
@Validated
public class AbonentsTableController {

    private final AbonentsTableService abonentsTableService;

    @Operation(
            summary = "Получить список абонентов",
            description = "Возвращает отфильтрованный список абонентов."
    )
    @PostMapping
    public ResponseEntity<Page<ResponseAbonetsTableDto>> getAbonentsWithFilters(
            @Parameter(name = "page", description = "Номер страницы", example = "0")
            @NotNull @PositiveOrZero @RequestParam(value = "page", defaultValue = "0") Integer page,
            @Parameter(name = "size", description = "Размер страницы", example = "10")
            @NotNull @PositiveOrZero @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestBody @Validated RequestFiltersForAbonentsTableDto requestFiltersForAbonentsTableDto) {
        Page<ResponseAbonetsTableDto> responseAbonetsTableDtoPage =
                abonentsTableService.getAbonentsWithFilters(page, size, requestFiltersForAbonentsTableDto);

        return ResponseEntity.ok(responseAbonetsTableDtoPage);
    }

    @Operation(
            summary = "Получить количество всех абонентов и отфильтрованных",
            description = "Возвращает количество всех абонентов и количество абонентов подходящих под фильтры."
    )
    @PostMapping("/count")
    public ResponseEntity<ResponseAbonentsListSizeDto> getAbonentsListSizeWithFilters(
            @RequestBody @Validated RequestFiltersForAbonentsTableDto requestFiltersForAbonentsTableDto) {
        ResponseAbonentsListSizeDto responseAbonentsListSizeDto =
                abonentsTableService.getAbonentsListSizeWithFilters(requestFiltersForAbonentsTableDto);

        return ResponseEntity.ok(responseAbonentsListSizeDto);
    }
}
