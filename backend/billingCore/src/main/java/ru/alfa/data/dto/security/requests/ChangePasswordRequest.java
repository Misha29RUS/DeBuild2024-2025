package ru.alfa.data.dto.security.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangePasswordRequest {

    /**
     * Старый пароль пользователя.
     */
    @NotBlank(message = "Password can't be blank")
    private String oldPassword;

    /**
     * Новый пароль пользователя.
     * Не может быть пустым и должен соответствовать заданным критериям безопасности:
     * минимум 8 символов, включая одну цифру, одну строчную букву, одну заглавную букву,
     * один специальный символ и не должен содержать пробелов.
     */
    @NotBlank(message = "Password can't be blank")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "Password must contain at least one digit, one lowercase, one uppercase, one special character and should be 8 characters long")
    private String newPassword;
}
