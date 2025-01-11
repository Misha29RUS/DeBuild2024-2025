package ru.alfa.service.security;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpService {
    private static final String OTP_CHARACTERS = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final Integer OTP_LENGTH = 6;

    public String generateOtp() {
        StringBuilder otp = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(OTP_CHARACTERS.charAt(random.nextInt(OTP_CHARACTERS.length())));
        }
        log.info("Generated OTP: {}", otp);
        return otp.toString();
    }

    @CachePut(value = "employee", key = "#email")
    public String getOtpForEmail(String email) {
        return generateOtp();
    }
}
