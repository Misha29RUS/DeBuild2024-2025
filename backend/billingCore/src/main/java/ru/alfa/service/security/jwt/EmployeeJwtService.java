package ru.alfa.service.security.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ru.alfa.data.dto.security.responses.GeneralAPIResponse;
import ru.alfa.data.dto.security.responses.RefreshTokenResponse;
import ru.alfa.data.dto.security.responses.RegisterVerifyResponse;
import ru.alfa.data.entity.employee.EmployeesCredential;
import ru.alfa.data.repository.employee.EmployeesCredentialRepository;
import ru.alfa.exception.ResourceNotFoundException;

@Service
@RequiredArgsConstructor
public class EmployeeJwtService {

    private final JwtHelper jwtHelper;

    private final UserDetailsService userDetailsService;

    private final EmployeesCredentialRepository employeesCredentialRepository;

    public ResponseEntity<?> generateAccessTokenFromRefreshToken(String refreshToken) {
        if (refreshToken != null) {
            try {
                String username = jwtHelper.extractUsername(refreshToken);
                if (username.startsWith("#refresh")) {
                    String finalUserName = username.substring(8);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(finalUserName);
                    EmployeesCredential employeesCredential = employeesCredentialRepository.findByEmail(finalUserName).
                            orElseThrow(() ->
                                    new ResourceNotFoundException("Employee not found with email " + finalUserName));
                    if (jwtHelper.isRefreshTokenValid(refreshToken, userDetails)) {
                        String accessToken = jwtHelper.generateAccessToken(userDetails);
                        return new ResponseEntity<>(RefreshTokenResponse.builder()
                                .accessToken(accessToken)
                                .email(employeesCredential.getEmail())
                                .role(employeesCredential.getRole())
                                .build(), HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>(GeneralAPIResponse.builder().message("Refresh token is expired").build(), HttpStatus.BAD_REQUEST);
                    }
                } else {
                    return new ResponseEntity<>(GeneralAPIResponse.builder().message("Invalid refresh token").build(), HttpStatus.BAD_REQUEST);
                }
            } catch (IllegalArgumentException | MalformedJwtException e) {
                return new ResponseEntity<>(GeneralAPIResponse.builder().message("Invalid refresh token").build(), HttpStatus.BAD_REQUEST);
            } catch (ResourceNotFoundException e) {
                return new ResponseEntity<>(GeneralAPIResponse.builder().message("User not found").build(), HttpStatus.NOT_FOUND);
            } catch (ExpiredJwtException e) {
                return new ResponseEntity<>(GeneralAPIResponse.builder().message("Refresh token is expired").build(), HttpStatus.BAD_REQUEST);
            }

        } else {
            return new ResponseEntity<>(GeneralAPIResponse.builder().message("Refresh token is null").build(), HttpStatus.BAD_REQUEST);
        }
    }

    public RegisterVerifyResponse generateJwtToken(EmployeesCredential employee) {
        String myAccessToken = jwtHelper.generateAccessToken(employee);
        String myRefreshToken = jwtHelper.generateRefreshToken(employee);
        return RegisterVerifyResponse.builder()
                .accessToken(myAccessToken)
                .refreshToken(myRefreshToken)
                .email(employee.getEmail())
                .role(employee.getRole())
                .status(employee.getStatus())
                .build();
    }
}

