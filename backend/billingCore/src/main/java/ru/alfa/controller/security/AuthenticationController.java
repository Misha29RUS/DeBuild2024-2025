package ru.alfa.controller.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.alfa.data.dto.security.requests.*;
import ru.alfa.data.dto.security.responses.RegisterResponse;
import ru.alfa.service.security.AuthenticationService;
import ru.alfa.service.security.jwt.EmployeeJwtService;

/**
 * Контроллер для обработки запросов аутентификации и регистрации пользователей
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController implements AuthenticationInterface {

    /**
     * Сервис для выполнения операций аутентификации пользователей
     */
    private final AuthenticationService authenticationService;

    /**
     * Сервис для работы с JWT, включая генерацию и валидацию токенов
     */
    private final EmployeeJwtService jwtService;

    /**
     * Обрабатывает запрос на регистрацию нового пользователя.
     *
     * @param registerRequest объект запроса с данными для регистрации
     * @return ResponseEntity с результатом регистрации
     */
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        log.info("Register request received for email: {}", registerRequest.getEmail());
        return authenticationService.registerEmployee(registerRequest);
    }

    /**
     * Обрабатывает запрос на верификацию регистрации пользователя.
     *
     * @param registerVerifyRequest объект запроса с данными для верификации
     * @return ResponseEntity с результатом верификации
     */
    @PostMapping(value = "/verify", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> verifyRegistration(@Valid @RequestBody RegisterVerifyRequest registerVerifyRequest) {
        log.info("registration verification request received for email {}", registerVerifyRequest.getEmail());
        return authenticationService.verifyEmployeeRegistration(registerVerifyRequest);
    }

    /**
     * Обрабатывает запрос на вход пользователя в систему.
     *
     * @param loginRequest объект запроса с данными для входа
     * @return ResponseEntity с результатом входа
     */
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        log.info("login request received for email {}", loginRequest.getEmail());
        return authenticationService.loginEmployee(loginRequest, response);
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("accessToken", "");
        Cookie cookie2 = new Cookie("refreshToken", "");

        // Устанавливаем путь и время жизни куки
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie2.setPath("/");
        cookie2.setMaxAge(0);
        // Добавляем куку в ответ
        response.addCookie(cookie);
        response.addCookie(cookie2);
        return ResponseEntity.ok().build();
    }



    /**
     * Обрабатывает запрос на отправку OTP (одноразового пароля) для сброса пароля.
     *
     * @param emailRequest объект запроса с данными для сброса пароля
     * @return ResponseEntity с результатом отправки OTP
     */
    @PostMapping(value = "/send-otp", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody EmailRequest emailRequest) {
        log.info("forgot password request received for email {}", emailRequest.getEmail());
        return authenticationService.sendOtp(emailRequest);
    }

    /**
     * Обрабатывает запрос на верификацию OTP (одноразового пароля).
     *
     * @param registerVerifyRequest объект запроса с данными для верификации OTP
     * @return ResponseEntity с результатом верификации OTP
     */
    @PostMapping(value = "/verify-otp", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody RegisterVerifyRequest registerVerifyRequest) {
        log.info("OTP verification request received for email {}", registerVerifyRequest.getEmail());
        return authenticationService.verifyOtpForResetPassword(registerVerifyRequest);
    }

    /**
     * Обрабатывает запрос на сброс пароля пользователя.
     *
     * @param resetPasswordRequest объект запроса с новыми данными пароля
     * @return ResponseEntity с результатом сброса пароля
     */
    @PostMapping(value = "/reset-password", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        log.info("Password reset request received for email {}", resetPasswordRequest.getEmail());
        return authenticationService.resetPassword(resetPasswordRequest);
    }

    /**
     * Обрабатывает запрос на обновление токена доступа с использованием refresh token.
     *
     * @param refreshToken строка refresh token для генерации нового токена доступа
     * @return ResponseEntity с новым токеном доступа
     */
    @GetMapping("/getRefreshToken")
    public ResponseEntity<?> refreshToken(@RequestParam(name = "refreshToken") String refreshToken) {
        log.info("Refresh token request received");
        return jwtService.generateAccessTokenFromRefreshToken(refreshToken);
    }

}
