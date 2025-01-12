package ru.alfa.service.security;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String emailAddress;

    @Async
    @Retryable(
            retryFor = MessagingException.class,
            maxAttempts = 4,
            backoff = @Backoff(delay = 3000)
    )
    public CompletableFuture<Integer> sendEmailWithRetry(String to, String otp) throws MessagingException, UnsupportedEncodingException {
        try {
            sendOtpByEmail(to, otp);
            return CompletableFuture.completedFuture(1);
        } catch (MessagingException e) {
            return CompletableFuture.completedFuture(handleMessagingException(e));
        } catch (UnsupportedEncodingException e) {
            return CompletableFuture.completedFuture(handleUnsupportedEncodingException(e));
        }
    }

    @Recover
    public int handleMessagingException(MessagingException e) {
        log.error("Maximum attempt reached, failed to send email");
        log.error("Error message: {}", e.getMessage());
        return -1;
    }

    @Recover
    public int handleUnsupportedEncodingException(UnsupportedEncodingException e) {
        log.error("Maximum attempt reached , failed to send email");
        log.error("Error message : {}", e.getMessage());
        return -1;
    }

    public void sendOtpByEmail(String to, String otp) throws MessagingException, UnsupportedEncodingException {
        log.info("Trying to send email to {}", to);

        String senderName = "Альфа телеком";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(emailAddress, senderName);
        helper.setTo(to);
        helper.setSubject("Одноразовый код для подтверждения электронной почты");
        String htmlContent = "<html>"
                + "<body>"
                + "<p>Одноразовый код для подтверждения вашего адреса электронной почты: "
                + "<strong style='font-size:18px; color:red;'>" + otp + "</strong>.</p>"
                + "<p>Одноразовый код действителен <strong>10 минут</strong>.</p>"
                + "<p style='color:gray; font-size:12px;'>(Это сообщение сгенерировано автоматически, "
                + "так что отвечать на него не нужно)</p>"
                + "</body>"
                + "</html>";
        helper.setText(htmlContent, true);

        javaMailSender.send(message);
        log.info("Email has been sent successfully to {}", to);
    }
}
