package ru.alfa.controller.tariff;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alfa.data.dto.tariff.RequestFiltersForTariffsTableDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.service.tariff.TariffTableService;

@Tag(name = "Контроллер вывода таблицы тарифов с фильтрами")
@RestController
@RequestMapping("/api/tariifs")
@RequiredArgsConstructor
@Validated
public class TariffTableController {

    private final TariffTableService tariffTableService;

    @PostMapping
    public ResponseEntity<Page<ResponseTariffDto>> getTariffWithFilters(
            @Parameter(name = "page",description = "Номер страницы", example = "0")
            @NotNull @PositiveOrZero @RequestParam(value = "page", defaultValue = "0") Integer page,
            @Parameter(name = "size", description = "Размер страницы", example = "10")
            @NotNull @PositiveOrZero @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestBody @Validated RequestFiltersForTariffsTableDto requestFiltersForTariffsTableDto) {
        Page<ResponseTariffDto> responseTariffDtoPage =
                tariffTableService.getTariffsWithFilters(page, size, requestFiltersForTariffsTableDto);

        return ResponseEntity.ok(responseTariffDtoPage);
    }
}
