package ru.alfa.service.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import ru.alfa.data.dto.security.requests.*;
import ru.alfa.data.dto.security.responses.RegisterResponse;

/**
 * Интерфейс для сервиса аутентификации
 */
public interface AuthenticationService {

    /**
     * Регистрирует нового пользователя.
     *
     * @param registerRequest запрос на регистрацию, содержащий необходимые данные.
     * @return ResponseEntity с результатом регистрации, включая сообщение об успехе или ошибке.
     */
    ResponseEntity<RegisterResponse> registerEmployee(RegisterRequest registerRequest);

    /**
     * Верифицирует регистрацию пользователя на основе предоставленного OTP.
     *
     * @param registerVerifyRequest запрос на верификацию, содержащий адрес электронной почты и OTP.
     * @return ResponseEntity с результатом верификации, включая сообщение об успехе или ошибке.
     */
    ResponseEntity<?> verifyEmployeeRegistration(RegisterVerifyRequest registerVerifyRequest);

    /**
     * Аутентифицирует пользователя на основе введенных учетных данных.
     *
     * @param loginRequest запрос на вход, содержащий адрес электронной почты и пароль.
     * @param response
     * @return ResponseEntity с результатом аутентификации, включая JWT-токен при успешной аутентификации.
     */
    ResponseEntity<?> loginEmployee(LoginRequest loginRequest, HttpServletResponse response);

    /**
     * Повторно отправляет OTP на адрес электронной почты пользователя для восстановления доступа.
     *
     * @param emailRequest запрос на восстановление пароля, содержащий адрес электронной почты.
     * @return ResponseEntity с результатом операции отправки OTP.
     */
    ResponseEntity<?> sendOtp(EmailRequest emailRequest);

    /**
     * Верифицирует одноразовый пароль (OTP) для пользователя.
     *
     * @param registerVerifyRequest запрос на верификацию, содержащий адрес электронной почты и OTP.
     * @return ResponseEntity с результатом верификации OTP.
     */
    ResponseEntity<?> verifyOtpForResetPassword(RegisterVerifyRequest registerVerifyRequest);

    /**
     * Сбрасывает пароль пользователя на основе нового пароля и подтверждения пароля.
     *
     * @param resetPasswordRequest запрос на сброс пароля, содержащий адрес электронной почты и новый пароль.
     * @return ResponseEntity с результатом операции сброса пароля.
     */
    ResponseEntity<?> resetPassword(ResetPasswordRequest resetPasswordRequest);

    /**
     * Возвращает профиль пользователя по его адресу электронной почты.
     *
     * @return ResponseEntity с профилем пользователя или сообщением об ошибке.
     */
    ResponseEntity<?> myProfile(String username);

    ResponseEntity<?> changePassword(String username, ChangePasswordRequest changePasswordRequest);
}
