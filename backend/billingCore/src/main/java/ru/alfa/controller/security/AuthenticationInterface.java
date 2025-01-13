package ru.alfa.controller.security;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import ru.alfa.data.dto.security.requests.*;
import ru.alfa.data.dto.security.responses.Error;
import ru.alfa.data.dto.security.responses.*;


/**
 * Интерфейс для определения API аутентификации
 */
@Tag(name = "Authentication", description = "Authentication APIs")
public interface AuthenticationInterface {

    /**
     * Регистрация нового пользователя.
     * Этот API регистрирует нового пользователя, если пользователь еще не существует в записях,
     * и отправляет электронное письмо пользователю для верификации.
     *
     * @param registerRequest объект запроса с данными для регистрации
     * @return ResponseEntity с результатом регистрации
     */
    @Operation(summary = "Регистрация нового пользователя",
            description = "Этот API регистрирует нового пользователя, если он еще не указан в записях, и отправляет ему электронное письмо для подтверждения.")
    ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest registerRequest);

    /**
     * Верификация регистрации пользователя.
     * Этот API проверяет регистрацию пользователя с использованием предоставленного OTP.
     *
     * @param registerVerifyRequest объект запроса с данными для верификации
     * @return ResponseEntity с результатом верификации
     */
    @Operation(summary = "Подтвердите регистрацию пользователя",
            description = "Этот API проверяет регистрацию пользователя с помощью предоставленного OTP.")
    ResponseEntity<?> verifyRegistration(@Valid @RequestBody RegisterVerifyRequest registerVerifyRequest);

    /**
     * Вход пользователя в систему.
     * Аутентифицирует и выполняет вход пользователя.
     *
     * @param loginRequest объект запроса с данными для входа
     * @return ResponseEntity с результатом входа
     */
    @Operation(summary = "Авторизация пользователя", description = "Выполнить аутентификацию и вход в систему пользователя.")
    ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response);

    /**
     * Запрос на сброс пароля.
     * Отправляет OTP на электронную почту пользователя для сброса пароля.
     *
     * @param emailRequest объект запроса с данными для сброса пароля
     * @return ResponseEntity с результатом отправки OTP
     */
    @Operation(summary = "Забыл пароль", description = "Отправить OTP на электронную почту пользователя для сброса пароля.")
    ResponseEntity<?> forgotPassword(@Valid @RequestBody EmailRequest emailRequest);

    /**
     * Верификация OTP.
     * Проверяет введенный OTP пользователя.
     *
     * @param registerVerifyRequest объект запроса с данными для верификации OTP
     * @return ResponseEntity с результатом верификации OTP
     */
    @Operation(summary = "Верификация OTP", description = "Проверяет введенный OTP пользователя для сброса пароля.")
    ResponseEntity<?> verifyOtp(@Valid @RequestBody RegisterVerifyRequest registerVerifyRequest);

    /**
     * Сброс пароля пользователя.
     * Этот API позволяет сбросить пароль для пользователя.
     *
     * @param resetPasswordRequest объект запроса с данными для сброса пароля
     * @return ResponseEntity с результатом сброса пароля
     */
    @Operation(summary = "Сброс пароля", description = "Сбросить пароль пользователя после верификации OTP.")
    ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest);

    /**
     * Обновление токена доступа.
     * Этот API генерирует новый токен доступа на основе refresh token.
     *
     * @param refreshToken строка refresh token для генерации нового токена доступа
     * @return ResponseEntity с новым токеном доступа
     */
    @Operation(summary = "Обновление токена", description = "Генерирует новый токен доступа на основе refresh token")
    ResponseEntity<?> refreshToken(@RequestParam(name = "refreshToken") String refreshToken);
}
