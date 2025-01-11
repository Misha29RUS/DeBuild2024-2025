package ru.alfa.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;
import ru.alfa.data.repository.employee.EmployeesCredentialRepository;
import ru.alfa.service.security.jwt.JwtAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final AuthenticationEntryPoint authenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;
    private final EmployeesCredentialRepository employeesCredentialRepository;

    @Bean
    MvcRequestMatcher.Builder mvc(HandlerMappingIntrospector introspector) {
        return new MvcRequestMatcher.Builder(introspector);
    }

    private static final String[] SWAGGER_WHITELIST = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            "/file/*",
            "/error/*",
            "/"
    };

    private static final String[] ADMIN_WHITELIST = {
            "/api/abonents/**",
            "/api/phoneNumber/**",
            "/api/service/**",
            "/api/profile/**",
            "/api/services/**",
            "/api/tariff/**",
            "/api/tariffs/**"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, MvcRequestMatcher.Builder mvc) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(mvc.pattern("/api/auth/**")).permitAll()
                        .requestMatchers(SWAGGER_WHITELIST).permitAll()
                        .requestMatchers("/api/employees/**").hasRole("SUPER_ADMIN")
                        .requestMatchers(ADMIN_WHITELIST).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, ADMIN_WHITELIST).hasRole("OPERATOR")
                        .requestMatchers(HttpMethod.DELETE, "/api/phoneNumber/service").hasRole("OPERATOR")
                        .requestMatchers(HttpMethod.POST, "/api/abonents/**", "/api/phoneNumber/service",
                                "/api/phoneNumber/tariff", "/api/tariffs", "/api/services")
                        .hasRole("OPERATOR")
                        .anyRequest().authenticated())
                .exceptionHandling(e -> e.authenticationEntryPoint(authenticationEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider);

        return http.build();
    }

    //    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(AbstractHttpConfigurer::disable)
//                .cors(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll());
//
//        return http.build();
//    }
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("*")); // Разрешить все источники
//        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Разрешить методы
//        configuration.setAllowedHeaders(List.of("*")); // Разрешить любые заголовки
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}
