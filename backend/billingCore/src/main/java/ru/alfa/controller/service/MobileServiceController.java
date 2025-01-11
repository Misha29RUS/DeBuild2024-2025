package ru.alfa.controller.service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alfa.data.dto.service.RequestMobileServiceDto;
import ru.alfa.data.dto.service.ResponseMobileServiceDto;
import ru.alfa.service.service.MobileServiceService;

import java.util.List;

/**
 * Контроллер для работы с мобильными услугами
 */
@Tag(name = "Контроллер для работы с мобильными услугами.")
@RestController
@RequestMapping("/api/service")
@RequiredArgsConstructor
@Validated
public class MobileServiceController {

    /**
     * Сервис для работы с мобильными услугами
     */
    private final MobileServiceService mobileServiceService;

    /**
     * Получает все доступные мобильные услуги.
     *
     * @return Список DTO всех мобильных услуг.
     */
    @Operation(
            summary = "Получить все услуги",
            description = "Возвращает список всех доступных мобильных услуг."
    )
    @GetMapping
    public ResponseEntity<List<ResponseMobileServiceDto>> getAllServices() {
        List<ResponseMobileServiceDto> services = mobileServiceService.getAllServices();
        return ResponseEntity.ok(services);
    }

    /**
     * Получает информацию о мобильной услуге по указанному идентификатору.
     *
     * @param id Идентификатор услуги, для которой требуется получить информацию.
     * @return DTO с информацией о мобильной услуге.
     */
    @Operation(
            summary = "Получить услугу по ID",
            description = "Возвращает информацию о мобильной услуге по указанному идентификатору."
    )
    @GetMapping("/{id}")
    public ResponseEntity<ResponseMobileServiceDto> getServiceById(
            @Parameter(name = "id", description = "Идентификатор услуги", example = "1")
            @NotNull @Positive @PathVariable("id") Long id) {
        ResponseMobileServiceDto responseMobileServiceDto = mobileServiceService.getServiceById(id);
        return ResponseEntity.ok(responseMobileServiceDto);

    }

    /**
     * Создает новую мобильную услугу на основе предоставленных данных.
     *
     * @param requestMobileServiceDto DTO с данными для создания новой услуги.
     * @return DTO созданной мобильной услуги.
     */
    @Operation(
            summary = "Создать новую услугу",
            description = "Создает новую мобильную услугу на основе предоставленных данных."
    )
    @PostMapping
    public ResponseEntity<ResponseMobileServiceDto> createService(@RequestBody @Validated
                                                                  RequestMobileServiceDto requestMobileServiceDto) {
        ResponseMobileServiceDto createdService = mobileServiceService.createService(requestMobileServiceDto);
        return ResponseEntity.ok(createdService);
    }

    /**
     * Обновляет информацию о мобильной услуге по указанному идентификатору.
     *
     * @param id                      Идентификатор услуги, которую необходимо обновить.
     * @param requestMobileServiceDto DTO с новыми данными для обновления услуги.
     * @return DTO обновленной мобильной услуги.
     */
    @Operation(
            summary = "Обновить услугу",
            description = "Обновляет информацию о мобильной услуге по указанному идентификатору."
    )
    @PutMapping("/{id}")
    public ResponseEntity<ResponseMobileServiceDto> updateService(
            @Parameter(name = "id", description = "Идентификатор услуги", example = "1")
            @NotNull @Positive @PathVariable("id") Long id,
            @RequestBody @Validated RequestMobileServiceDto requestMobileServiceDto) {
        ResponseMobileServiceDto updateService = mobileServiceService.updateService(id, requestMobileServiceDto);
        return ResponseEntity.ok(updateService);
    }

    /**
     * Удаляет мобильную услугу по указанному идентификатору.
     *
     * @param id Идентификатор услуги, которую необходимо удалить.
     * @return Ответ без содержимого (204 No Content).
     */
    @Operation(
            summary = "Удалить услугу",
            description = "Удаляет мобильную услугу по указанному идентификатору."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(
            @Parameter(name = "id", description = "Идентификатор тарифа", example = "1")
            @NotNull @Positive @PathVariable("id") Long id) {
        mobileServiceService.deleteMobileServiceById(id);
        return ResponseEntity.noContent().build();
    }
}
