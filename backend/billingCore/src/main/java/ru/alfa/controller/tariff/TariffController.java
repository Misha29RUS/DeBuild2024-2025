package ru.alfa.controller.tariff;

import io.swagger.v3.oas.annotations.Parameter;
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

@RestController
@RequestMapping("/api/tariff")
@RequiredArgsConstructor
@Validated
public class TariffController {

    private final TariffService tariffService;

    @GetMapping
    public ResponseEntity<List<ResponseTariffDto>> getAllTariffs() {
        List<ResponseTariffDto> tariffs = tariffService.getAllTariffs();
        return ResponseEntity.ok(tariffs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseTariffDto> getTariffById(
            @Parameter(name = "id", description = "Идентификатор тарифа", example = "1")
            @NotNull @Positive @PathVariable("id") Long id) {
        ResponseTariffDto responseTariffDto = tariffService.getTariffById(id);
        return ResponseEntity.ok(responseTariffDto);
    }

    @PostMapping
    public ResponseEntity<ResponseTariffDto> createTariff(@RequestBody @Validated RequestTariffDto requestTariffDto) {
        ResponseTariffDto createdTariff = tariffService.createTariff(requestTariffDto);
        return ResponseEntity.ok(createdTariff);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseTariffDto> updateTariff(
            @Parameter(name = "id", description = "Идентификатор тарифа", example = "1")
            @NotNull @Positive @PathVariable("id") Long id,
            @RequestBody @Validated RequestTariffDto requestTariffDto) {
        ResponseTariffDto updatedTariff = tariffService.updateTariff(id, requestTariffDto);
        return ResponseEntity.ok(updatedTariff);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTariff(
            @Parameter(name = "id", description = "Идентификатор тарифа", example = "1")
            @NotNull @Positive @PathVariable("id") Long id) {
        tariffService.deleteTariffById(id);
        return ResponseEntity.noContent().build();
    }
}
