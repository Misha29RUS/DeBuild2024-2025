package ru.alfa.service.security;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.CacheManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.alfa.data.dto.security.requests.*;
import ru.alfa.data.dto.security.responses.GeneralAPIResponse;
import ru.alfa.data.dto.security.responses.RegisterResponse;
import ru.alfa.data.dto.security.responses.RegisterVerifyResponse;
import ru.alfa.data.dto.security.responses.UserProfile;
import ru.alfa.data.entity.employee.EmployeesCredential;
import ru.alfa.data.entity.employee.enums.EmployeeStatus;
import ru.alfa.data.repository.employee.EmployeesCredentialRepository;
import ru.alfa.exception.ResourceNotFoundException;
import ru.alfa.service.security.jwt.EmployeeJwtService;

import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

/**
 * Реализация сервиса аутентификации
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImplementation implements AuthenticationService {

    /**
     * Репозиторий для работы с пользователями
     */
    private final EmployeesCredentialRepository employeesCredentialRepository;

    /**
     * Кодировщик паролей
     */
    private final PasswordEncoder passwordEncoder;

    /**
     * Сервис для работы с OTP
     */
    private final OtpService otpService;

    /**
     * Сервис для отправки электронных писем
     */
    private final EmailService emailService;

    /**
     * Сервис для работы с JWT
     */
    private final EmployeeJwtService jwtService;

    /**
     * Менеджер кэша
     */
    private final CacheManager cacheManager;

    /**
     * Менеджер аутентификации
     */
    private final AuthenticationManager authenticationManager;

    /**
     * Регистрирует нового сотрудника или обновляет существующего.
     *
     * @param registerRequest запрос на регистрацию сотрудника, содержащий необходимые данные.
     * @return ResponseEntity с сообщением о результате регистрации.
     */
    @Override
    public ResponseEntity<RegisterResponse> registerEmployee(RegisterRequest registerRequest) {
        try {
            log.info("Received request to register employee with email {}", registerRequest.getEmail());
            Optional<EmployeesCredential> existingEmployeeOpt =
                    employeesCredentialRepository.findByEmail(registerRequest.getEmail().trim().toLowerCase());
            if (existingEmployeeOpt.isPresent()) {
                EmployeesCredential existingEmployee = existingEmployeeOpt.get();
                log.info("Employee already exists with email {}", registerRequest.getEmail());
                if (!existingEmployee.getStatus().equals(EmployeeStatus.APPROVED_TO_REGISTRATION)) {
                    return new ResponseEntity<>(RegisterResponse.builder()
                            .message("Employee already exists")
                            .build(), HttpStatus.BAD_REQUEST);
                } else {
                    log.info("Employee already exists but not verified with email {}, so their details will be updated",
                            registerRequest.getEmail());
                    existingEmployee.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
                    String otpToBeMailed = otpService.getOtpForEmail(registerRequest.getEmail());
                    CompletableFuture<Integer> emailResponse =
                            emailService.sendEmailWithRetry(registerRequest.getEmail(), otpToBeMailed);
                    if (emailResponse.get() == -1) {
                        return new ResponseEntity<>(RegisterResponse.builder()
                                .message("Failed to send OTP email. Please try again later.")
                                .build(), HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                    employeesCredentialRepository.save(existingEmployee);
                    return new ResponseEntity<>(RegisterResponse.builder()
                            .message("An email with OTP has been sent to your email address. Kindly verify.")
                            .build(), HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>(RegisterResponse.builder()
                        .message("Employee not approved by company")
                        .build(), HttpStatus.BAD_REQUEST);
            }
        } catch (MessagingException | UnsupportedEncodingException e) {
            log.error("Failed to send OTP email for Employee with email {}", registerRequest.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(RegisterResponse.builder()
                    .message("Failed to send OTP email. Please try again later.")
                    .build());
        } catch (Exception e) {
            log.error("Failed to register employee with email {}", registerRequest.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(RegisterResponse.builder()
                    .message("Failed to register employee. Please try again later.")
                    .build());
        }
    }


    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Верифицирует регистрацию сотрудника на основе введенного OTP (одноразового пароля).
     *
     * @param registerVerifyRequest запрос на верификацию, содержащий адрес электронной почты и OTP.
     * @return ResponseEntity с результатом верификации.
     */
    @Override
    public ResponseEntity<?> verifyEmployeeRegistration(RegisterVerifyRequest registerVerifyRequest) {
        String emailEntered = registerVerifyRequest.getEmail().trim().toLowerCase();
        String otpEntered = registerVerifyRequest.getOtp().trim();
        try {
            EmployeesCredential employeesCredential = employeesCredentialRepository.findByEmail(emailEntered).orElseThrow(
                    ResourceNotFoundException::new
            );
            String cachedOtp = cacheManager.getCache("employee").get(emailEntered, String.class);
            if (cachedOtp == null) {
                log.info("the otp is not present in cache memory, it has expired for employee {}, " +
                        "kindly retry and Register", emailEntered);
                return new ResponseEntity<>(GeneralAPIResponse.builder().message("Otp has been expired for employee " +
                        emailEntered).build(), HttpStatus.REQUEST_TIMEOUT);
            } else if (!otpEntered.equals(cachedOtp)) {
                log.info("the entered otp does not match the otp Stored in cache for email {}", emailEntered);
                return new ResponseEntity<>(GeneralAPIResponse.builder().
                        message("Incorrect otp has been entered").build(), HttpStatus.BAD_REQUEST);
            } else {
                employeesCredential.setStatus(EmployeeStatus.VERIFIED);
                employeesCredentialRepository.save(employeesCredential);
                log.info("the employee email {} is successfully verified", employeesCredential.isEnabled());
//                RegisterVerifyResponse jwtToken = jwtService.generateJwtToken(employeesCredential);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        } catch (ResourceNotFoundException ex) {
            log.info("Employee with email {} not found in database", emailEntered);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("Employee with this email does not exist").build(), HttpStatus.NOT_FOUND);
        }
    }

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Аутентифицирует сотрудника на основе введенных учетных данных.
     *
     * @param loginRequest запрос на вход, содержащий адрес электронной почты и пароль.
     * @param response
     * @return ResponseEntity с результатом аутентификации, включая JWT-токен при успешной аутентификации.
     */
    @Override
    public ResponseEntity<?> loginEmployee(LoginRequest loginRequest, HttpServletResponse response) {
        String email = loginRequest.getEmail().trim().toLowerCase();
        String password = loginRequest.getPassword();
        try {
            EmployeesCredential employee = employeesCredentialRepository.findByEmail(email).orElseThrow(
                    ResourceNotFoundException::new
            );
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            if (!employee.getStatus().equals(EmployeeStatus.VERIFIED)) {
                return new ResponseEntity<>(GeneralAPIResponse.builder().
                        message("Employee is not verified").build(), HttpStatus.BAD_REQUEST);
            }

            RegisterVerifyResponse jwtToken = jwtService.generateJwtToken(employee);
            Cookie cookie = new Cookie("accessToken", jwtToken.getAccessToken());
            Cookie cookie2 = new Cookie("refreshToken", jwtToken.getRefreshToken());

            // Устанавливаем путь и время жизни куки
            cookie.setPath("/");
            cookie.setMaxAge(86400);
            cookie2.setPath("/");
            cookie2.setMaxAge(86400*30);

            // Добавляем куку в ответ
            response.addCookie(cookie);
            response.addCookie(cookie2);
            return new ResponseEntity<>(jwtToken, HttpStatus.OK);

        } catch (ResourceNotFoundException ex) {
            log.info("Employee whose email is {} not found in Database", email);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("Employee with this email does not exist").build(), HttpStatus.NOT_FOUND);
        } catch (BadCredentialsException e) {
            log.error("Failed to authenticate employee with email {}", email, e);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("Invalid credentials").build(), HttpStatus.BAD_REQUEST);
        }


    }

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Повторно отправляет OTP на адрес электронной почты сотрудника для восстановления доступа.
     *
     * @param emailRequest запрос на восстановление пароля, содержащий адрес электронной почты.
     * @return ResponseEntity с результатом операции отправки OTP.
     */
    @Override
    public ResponseEntity<?> sendOtp(EmailRequest emailRequest) {
        String email = emailRequest.getEmail().trim().toLowerCase();
        try {
            EmployeesCredential employee = employeesCredentialRepository.findByEmail(email).orElseThrow(
                    ResourceNotFoundException::new
            );
//            if (cacheManager.getCache("employee").get(email, String.class) != null) {
//                log.info("the otp is already present in cache memory for employee {}, kindly retry after some time", email);
//                return new ResponseEntity<>(GeneralAPIResponse.builder().
//                        message("Kindly retry after some time").build(), HttpStatus.TOO_MANY_REQUESTS);
//            }
            String otpToBeSend = otpService.getOtpForEmail(email);
            CompletableFuture<Integer> emailResponse = emailService.sendEmailWithRetry(email, otpToBeSend);
            if (emailResponse.get() == -1) {
                return new ResponseEntity<>(GeneralAPIResponse.builder().
                        message("Failed to send OTP email. Please try again later.").build(),
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("An email with OTP has been sent to your email address. Kindly verify.").build(),
                    HttpStatus.OK);

        } catch (UnsupportedEncodingException e) {
            log.error("Failed to send OTP email for employee with email {}", email, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(RegisterResponse.builder()
                    .message("Failed to send OTP email. Please try again later.")
                    .build());
        } catch (ResourceNotFoundException ex) {
            log.info("employee with email {} not found in Database", email);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("Employee with email not found in database").build(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.error("Failed to resend OTP for employee with email {}", email, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(RegisterResponse.builder()
                    .message("Failed to resend OTP. Please try again later.")
                    .build());
        }
    }

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Верифицирует одноразовый пароль (OTP) для сотрудника.
     *
     * @param registerVerifyRequest запрос на верификацию, содержащий адрес электронной почты и OTP.
     * @return ResponseEntity с результатом верификации.
     */
    @Override
    public ResponseEntity<?> verifyOtpForResetPassword(RegisterVerifyRequest registerVerifyRequest) {
        String email = registerVerifyRequest.getEmail().trim().toLowerCase();
        String otp = registerVerifyRequest.getOtp().trim();
        EmployeesCredential employee;
        try {
            employee = employeesCredentialRepository.findByEmail(email).orElseThrow(
                    ResourceNotFoundException::new
            );
        } catch (ResourceNotFoundException ex) {
            log.info("employee with email {} not found in database ", email);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("Employee with this email does not exist").build(), HttpStatus.NOT_FOUND);
        }
        String cachedOtp = cacheManager.getCache("employee").get(email, String.class);
        if (cachedOtp == null) {
            log.info("the otp is not present in cache memory, it has expired for employee {}, kindly retry", email);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("Otp has been expired for employee " + email).build(), HttpStatus.REQUEST_TIMEOUT);
        } else if (!otp.equals(cachedOtp)) {
            log.info("entered otp does not match the otp Stored in cache for email {}", email);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("Incorrect otp has been entered").build(), HttpStatus.BAD_REQUEST);
        } else {
            employee.setStatus(EmployeeStatus.VERIFIED_FOR_RESET_PASSWORD);
            employeesCredentialRepository.save(employee);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("otp verified successfully, now you can change the password").build(), HttpStatus.OK);
        }
    }

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Сбрасывает пароль сотрудника на основе нового пароля и подтверждения пароля.
     *
     * @param resetPasswordRequest запрос на сброс пароля, содержащий адрес электронной почты и новый пароль.
     * @return ResponseEntity с результатом операции сброса пароля.
     */
    @Override
    public ResponseEntity<?> resetPassword(ResetPasswordRequest resetPasswordRequest) {
        String email = resetPasswordRequest.getEmail().trim().toLowerCase();
        String newPassword = resetPasswordRequest.getPassword();

        try {
            EmployeesCredential employee = employeesCredentialRepository.findByEmail(email).orElseThrow(
                    ResourceNotFoundException::new
            );
            if(!employee.getStatus().equals(EmployeeStatus.VERIFIED_FOR_RESET_PASSWORD)){
                return new ResponseEntity<>(GeneralAPIResponse.builder().
                        message("Employee is not verified for password reset").build(), HttpStatus.BAD_REQUEST);
            }
            employee.setPasswordHash(passwordEncoder.encode(newPassword));
            employee.setStatus(EmployeeStatus.VERIFIED);
            employeesCredentialRepository.save(employee);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("Password has been reset successfully").build(), HttpStatus.OK);
        } catch (ResourceNotFoundException ex) {
            log.info("Employee with email {} not found in the database", email);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("Employee does not exist with this email").build(), HttpStatus.NOT_FOUND);
        }
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Возвращает профиль сотрудника по его адресу электронной почты.
     *
     * @return ResponseEntity с профилем пользователя или сообщением об ошибке.
     */
    @Override
    public ResponseEntity<?> myProfile(String username) {
        String email = username.trim().toLowerCase();
        try {
            EmployeesCredential employeesCredential = employeesCredentialRepository.findByEmail(email).orElseThrow(
                    ResourceNotFoundException::new
            );
            return new ResponseEntity<>(UserProfile.builder()
                    .id(employeesCredential.getId())
                    .email(employeesCredential.getEmail())
                    .role(employeesCredential.getRole())
                    .name(employeesCredential.getEmployee().getName())
                    .surname(employeesCredential.getEmployee().getSurname())
                    .patronymic(employeesCredential.getEmployee().getPatronymic())
                    .employeeStatus(employeesCredential.getStatus())
                    .build(), HttpStatus.OK);

        } catch (ResourceNotFoundException ex) {
            log.info("user with email {} not found in the Database", email);
            return new ResponseEntity<>(GeneralAPIResponse.builder().message("user does not exist with this email").build(), HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<?> changePassword(String username, ChangePasswordRequest changePasswordRequest) {
        String email = username.trim().toLowerCase();
        try {
            EmployeesCredential employeesCredential = employeesCredentialRepository.findByEmail(email).orElseThrow(
                    ResourceNotFoundException::new
            );
            if (!passwordEncoder.matches(changePasswordRequest.getOldPassword(), employeesCredential.getPasswordHash())) {
                return new ResponseEntity<>(GeneralAPIResponse.builder().message("old password is incorrect").build(), HttpStatus.BAD_REQUEST);
            }
            employeesCredential.setPasswordHash(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            employeesCredentialRepository.save(employeesCredential);
            return new ResponseEntity<>(GeneralAPIResponse.builder().
                    message("Password has been changed successfully").build(), HttpStatus.OK);

        } catch (ResourceNotFoundException ex) {
            log.info("user with email {} not found in the Database", email);
            return new ResponseEntity<>(GeneralAPIResponse.builder().message("user does not exist with this email").build(), HttpStatus.NOT_FOUND);
        }
    }
}
