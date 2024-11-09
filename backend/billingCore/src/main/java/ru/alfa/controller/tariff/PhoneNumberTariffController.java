package ru.alfa.controller.tariff;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.alfa.data.dto.tariff.ResponseWithoutTariffPhoneNumberTariffDto;
import ru.alfa.service.tariff.PhoneNumberTariffService;

@Tag(name = "Контроллер для управления тарифом для номера телефона")
@RestController
@RequestMapping("/api/phoneNumber")
@RequiredArgsConstructor
@Validated
public class PhoneNumberTariffController {

    private final PhoneNumberTariffService service;

    @Operation(
            summary = "Смена тарифа для номера телефона",
            description = "Смена тарифа для номера телефона," +
                    " с помощью указанных идентификаторов номера телефона и тарифа."
    )
    @PostMapping("/tariff")
    public ResponseEntity<ResponseWithoutTariffPhoneNumberTariffDto> updateTariffForPhoneNumber(
            @Parameter(name = "phoneNumberId", description = "Идентификатор номера телефона", example = "1")
            @NotNull @Positive @RequestParam(value = "phoneNumberId") Long phoneNumberId,
            @Parameter(name = "tariffId", description = "Идентификатор тарифа", example = "1")
            @NotNull @Positive @RequestParam(value = "tariffId") Long tariffId
    ) {

        return ResponseEntity.ok(service.updateTariffForPhoneNumber(phoneNumberId, tariffId));
    }

}
