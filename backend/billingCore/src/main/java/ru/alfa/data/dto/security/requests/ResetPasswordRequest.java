package ru.alfa.data.dto.security.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Класс, представляющий запрос на сброс пароля пользователя
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResetPasswordRequest {

    /**
     * Адрес электронной почты пользователя, для которого требуется сбросить пароль.
     * Должен быть действительным адресом электронной почты и не может быть пустым.
     */
    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email can't be blank")
    private String email;

    /**
     * Новый пароль пользователя.
     * Не может быть пустым и должен соответствовать заданным критериям безопасности:
     * минимум 8 символов, включая одну цифру, одну строчную букву, одну заглавную букву,
     * один специальный символ и не должен содержать пробелов.
     */
    @NotBlank(message = "Password can't be blank")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "Password must contain at least one digit, one lowercase, one uppercase, one special character and should be 8 characters long")
    private String password;

}
