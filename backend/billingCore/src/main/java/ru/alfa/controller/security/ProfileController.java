package ru.alfa.controller.security;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alfa.data.dto.security.requests.ChangePasswordRequest;
import ru.alfa.data.dto.security.responses.GeneralAPIResponse;
import ru.alfa.data.dto.security.responses.UserProfile;
import ru.alfa.service.security.AuthenticationService;
import ru.alfa.service.security.jwt.JwtHelper;

/**
 * Контроллер для обработки запросов, связанных с профилем пользователя
 */
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {

    private final AuthenticationService authenticationService;

    private final JwtHelper jwtHelper;

    /**
     * Получение информации о профиле пользователя.
     * Этот API позволяет пользователю получить информацию о своем профиле.
     *
     * @return ResponseEntity с информацией о профиле пользователя или ошибкой, если пользователь не найден
     */
    @Operation(summary = "Профиль сотрудника", description = "Получение информации о профиле сотрудника.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK: User profile retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserProfile.class))),
            @ApiResponse(responseCode = "404", description = "Not Found: User not found",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GeneralAPIResponse.class))),

    })
    @PostMapping("/employee")
    public ResponseEntity<?> myProfile(@NonNull HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.substring(7);
        String username = jwtHelper.extractUsername(token);
        log.info("My profile request received for username {}", username);
        return authenticationService.myProfile(username);
    }

    /**
     * Получение информации о профиле пользователя.
     * Этот API позволяет пользователю получить информацию о своем профиле.
     *
     * @return ResponseEntity с информацией о профиле пользователя или ошибкой, если пользователь не найден
     */
    @Operation(summary = "Смена пароля", description = "Смена пароля авторизированного сотрудника.")
    @PostMapping("/password")
    public ResponseEntity<?> changePassword(@NonNull HttpServletRequest request,
                                            @Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.substring(7);
        String username = jwtHelper.extractUsername(token);
        log.info("My profile request received for username {}", username);
        return authenticationService.changePassword(username, changePasswordRequest);
    }
}
