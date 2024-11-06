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
import ru.alfa.data.dto.service.ResponsePhoneNumberMobileServiceWithIdDto;
import ru.alfa.service.service.PhoneNumberMobileServiceService;

@Tag(name = "Контроллер для управления услугами для номера телефона")
@RestController
@RequestMapping("/api/phoneNumber")
@RequiredArgsConstructor
@Validated
public class PhoneNumberMobileServiceController {

    private final PhoneNumberMobileServiceService service;

    @Operation(
            summary = "Активация услуги для номера телефона",
            description = "Подключение услуги для номера телефона," +
                    " с помощью указанных идентификаторов номера телефона и услуги."
    )
    @PostMapping("/service")
    public ResponseEntity<ResponsePhoneNumberMobileServiceWithIdDto> activateServiceForPhoneNumber(
            @Parameter(name = "phoneNumberId", description = "Идентификатор номера телефона", example = "1")
            @NotNull @Positive @RequestParam(value = "phoneNumberId") Long phoneNumberId,
            @Parameter(name = "serviceId", description = "Идентификатор услуги", example = "1")
            @NotNull @Positive @RequestParam(value = "serviceId") Long serviceId
    ) {
        return ResponseEntity.ok(service.activateServiceForPhoneNumber(phoneNumberId, serviceId));
    }

    @Operation(
            summary = "Деактивация услуги для номера телефона",
            description = "Отключение услуги для номера телефона," +
                    " с помощью указанных идентификаторов номера телефона и услуги."
    )
    @DeleteMapping("/service")
    public ResponseEntity<Void> deactivateServiceForPhoneNumber(
            @Parameter(name = "phoneNumberId", description = "Идентификатор номера телефона", example = "1")
            @NotNull @Positive @RequestParam(value = "phoneNumberId") Long phoneNumberId,
            @Parameter(name = "serviceId", description = "Идентификатор услуги", example = "1")
            @NotNull @Positive @RequestParam(value = "serviceId") Long serviceId
    ) {
        service.deactivateServiceForPhoneNumber(phoneNumberId, serviceId);
        return ResponseEntity.ok().build();
    }
}
