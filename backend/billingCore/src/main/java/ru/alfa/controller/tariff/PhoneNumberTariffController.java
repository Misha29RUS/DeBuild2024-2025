package ru.alfa.controller.tariff;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.alfa.data.dto.tariff.ResponseWithoutTariffPhoneNumberTariffDto;
import ru.alfa.service.tariff.PhoneNumberTariffService;

/**
 * Контроллер для управления тарифом для номера телефона
 */
@Tag(name = "Контроллер для управления тарифом для номера телефона")
@RestController
@RequestMapping("/api/phoneNumber")
@RequiredArgsConstructor
@Validated
public class PhoneNumberTariffController {

    /**
     * Сервис для управления тарифом для номера телефона
     */
    private final PhoneNumberTariffService service;

    /**
     * Смена тарифа для указанного номера телефона.
     *
     * @param phoneNumberId Идентификатор номера телефона, для которого требуется сменить тариф.
     * @param tariffId      Идентификатор тарифа, который необходимо применить к номеру телефона.
     * @return DTO с информацией о новом тарифе для номера телефона.
     */
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
            @NotNull @Positive @RequestParam(value = "tariffId") Long tariffId,
            @Parameter(name = "minutesStep", description = "Шаг минут", example = "1")
            @PositiveOrZero @RequestParam(value = "minutesStep", required = false) Integer minutesStep,
            @Parameter(name = "smsStep", description = "Шаг смс", example = "1")
            @PositiveOrZero @RequestParam(value = "smsStep", required = false) Integer smsStep,
            @Parameter(name = "gigabyteStep", description = "Шаг Гигабайт", example = "1")
            @PositiveOrZero @RequestParam(value = "gigabyteStep", required = false) Integer gigabyteStep

    ) {
        return ResponseEntity.ok(service.updateTariffForPhoneNumber(phoneNumberId, tariffId,
                minutesStep, smsStep, gigabyteStep));
    }
}
