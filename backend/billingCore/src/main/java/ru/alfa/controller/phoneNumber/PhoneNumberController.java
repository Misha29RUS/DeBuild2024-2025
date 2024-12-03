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

/**
 * Контроллер для работы с номерами телефонов
 */
@Tag(name = "Контроллер для работы с номерами телефонов")
@RestController
@RequestMapping("/api/phoneNumber")
@RequiredArgsConstructor
@Validated
public class PhoneNumberController {

    /**
     * Сервис для работы с номерами телефонов
     */
    private final PhoneNumberService phoneNumberService;

    /**
     * Получает баланс номера телефона и историю операций.
     *
     * @param id Идентификатор номера телефона, для которого требуется получить баланс.
     * @return DTO с информацией о балансе и истории операций для указанного номера телефона.
     */
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

    /**
     * Получает информацию о пользователе по номеру телефона.
     *
     * @param id Идентификатор номера телефона, для которого требуется получить информацию о пользователе.
     * @return DTO с информацией о пользователе, связанном с указанным номером телефона.
     */
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

    /**
     * Получает информацию о тарифе по номеру телефона.
     *
     * @param id Идентификатор номера телефона, для которого требуется получить информацию о тарифе.
     * @return DTO с информацией о тарифе, связанном с указанным номером телефона.
     */
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

    /**
     * Получает информацию об услугах по номеру телефона.
     *
     * @param id Идентификатор номера телефона, для которого требуется получить информацию об услугах.
     * @return DTO с информацией об услугах, связанных с указанным номером телефона.
     */
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
