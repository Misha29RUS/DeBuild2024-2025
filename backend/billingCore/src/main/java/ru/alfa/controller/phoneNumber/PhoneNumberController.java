package ru.alfa.controller.phoneNumber;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberBalanceDto;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberWithServicesInfoDto;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberWithTariffInfoDto;
import ru.alfa.data.dto.phoneNumber.ResponsePhoneNumberWithUserInfoDto;
import ru.alfa.service.phoneNumber.PhoneNumberService;

@Tag(name = "Контроллер для работы с номерами телефонов")
@RestController
@RequestMapping("/api/phoneNumber")
@RequiredArgsConstructor
@Validated
public class PhoneNumberController {

    private final PhoneNumberService phoneNumberService;

    @Operation(
            summary = "Получить баланс номера телефона и историю операций",
            description = "Возвращает информацию о балансе для указанного номера телефона."
    )
    @GetMapping("/balance/{id}")
    public ResponseEntity<ResponsePhoneNumberBalanceDto> getBalanceHistory(
            @Parameter(name = "id", description = "Идентификатор номера телефона",
                    example = "1") @NotNull @Positive @PathVariable("id") Long id) {
        return ResponseEntity.ok(phoneNumberService.getBalanceHistory(id));
    }

    @Operation(
            summary = "Получить информацию о пользователе по номеру телефона",
            description = "Возвращает информацию о пользователе, связанном с указанным номером телефона."
    )
    @GetMapping("/user/{id}")
    public ResponseEntity<ResponsePhoneNumberWithUserInfoDto> getPhoneNumberAndUserInfo(
            @Parameter(name = "id", description = "Идентификатор номера телефона",
                    example = "1") @NotNull @Positive @PathVariable("id") Long id) {
        return ResponseEntity.ok(phoneNumberService.getPhoneNumberAndUserInfo(id));
    }

    @Operation(
            summary = "Получить информацию о тарифе по номеру телефона",
            description = "Возвращает информацию о тарифе, связанном с указанным номером телефона."
    )
    @GetMapping("/tariff/{id}")
    public ResponseEntity<ResponsePhoneNumberWithTariffInfoDto> getPhoneNumberAndTariffInfo(
            @Parameter(name = "id", description = "Идентификатор номера телефона",
                    example = "1") @NotNull @Positive @PathVariable("id") Long id) {
        return ResponseEntity.ok(phoneNumberService.getPhoneNumberAndTariffInfo(id));
    }

    @Operation(
            summary = "Получить информацию о услугах по номеру телефона",
            description = "Возвращает информацию о услугах, связанных с указанным номером телефона."
    )
    @GetMapping("/service/{id}")
    public ResponseEntity<ResponsePhoneNumberWithServicesInfoDto> getPhoneNumberAndServicesInfo(
            @Parameter(name = "id", description = "Идентификатор номера телефона",
                    example = "1") @NotNull @Positive @PathVariable("id") Long id) {
        return ResponseEntity.ok(phoneNumberService.getPhoneNumberAndServicesInfo(id));
    }


}
