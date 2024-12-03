package ru.alfa.controller.tariff;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alfa.data.dto.tariff.RequestTariffDto;
import ru.alfa.data.dto.tariff.ResponseTariffDto;
import ru.alfa.service.tariff.TariffService;

import java.util.List;

/**
 * Контроллер для работы с тарифами
 */
@Tag(name = "Контроллер для работы с тарифами")
@RestController
@RequestMapping("/api/tariff")
@RequiredArgsConstructor
@Validated
public class TariffController {

    /**
     * Сервис для работы с тарифами
     */
    private final TariffService tariffService;

    /**
     * Получает список всех доступных тарифов.
     *
     * @return Список DTO всех доступных тарифов.
     */
    @Operation(
            summary = "Получить все тарифы",
            description = "Возвращает список всех доступных тарифов."
    )
    @GetMapping
    public ResponseEntity<List<ResponseTariffDto>> getAllTariffs() {
        List<ResponseTariffDto> tariffs = tariffService.getAllTariffs();
        return ResponseEntity.ok(tariffs);
    }

    /**
     * Получает информацию о тарифе по указанному идентификатору.
     *
     * @param id Идентификатор тарифа, для которого требуется получить информацию.
     * @return DTO с информацией о тарифе.
     */
    @Operation(
            summary = "Получить тариф по ID",
            description = "Возвращает информацию о тарифе по указанному идентификатору."
    )
    @GetMapping("/{id}")
    public ResponseEntity<ResponseTariffDto> getTariffById(
            @Parameter(name = "id", description = "Идентификатор тарифа", example = "1")
            @NotNull @Positive @PathVariable("id") Long id) {
        ResponseTariffDto responseTariffDto = tariffService.getTariffById(id);
        return ResponseEntity.ok(responseTariffDto);
    }

    /**
     * Создает новый тариф на основе предоставленных данных.
     *
     * @param requestTariffDto DTO с данными для создания нового тарифа.
     * @return DTO созданного тарифа.
     */
    @Operation(
            summary = "Создать новый тариф",
            description = "Создает новый тариф на основе предоставленных данных."
    )
    @PostMapping
    public ResponseEntity<ResponseTariffDto> createTariff(@RequestBody @Validated RequestTariffDto requestTariffDto) {
        ResponseTariffDto createdTariff = tariffService.createTariff(requestTariffDto);
        return ResponseEntity.ok(createdTariff);
    }

    /**
     * Обновляет информацию о тарифе по указанному идентификатору.
     *
     * @param id               Идентификатор тарифа, который необходимо обновить.
     * @param requestTariffDto DTO с новыми данными для обновления тарифа.
     * @return DTO обновленного тарифа.
     */
    @Operation(
            summary = "Обновить тариф",
            description = "Обновляет информацию о тарифе по указанному идентификатору."
    )
    @PutMapping("/{id}")
    public ResponseEntity<ResponseTariffDto> updateTariff(
            @Parameter(name = "id", description = "Идентификатор тарифа", example = "1")
            @NotNull @Positive @PathVariable("id") Long id,
            @RequestBody @Validated RequestTariffDto requestTariffDto) {
        ResponseTariffDto updatedTariff = tariffService.updateTariff(id, requestTariffDto);
        return ResponseEntity.ok(updatedTariff);
    }

    /**
     * Удаляет тариф по указанному идентификатору.
     *
     * @param id Идентификатор тарифа, который необходимо удалить.
     * @return Ответ без содержимого (204 No Content).
     */
    @Operation(
            summary = "Удалить тариф",
            description = "Удаляет тариф по указанному идентификатору."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTariff(
            @Parameter(name = "id", description = "Идентификатор тарифа", example = "1")
            @NotNull @Positive @PathVariable("id") Long id) {
        tariffService.deleteTariffById(id);
        return ResponseEntity.noContent().build();
    }
}
