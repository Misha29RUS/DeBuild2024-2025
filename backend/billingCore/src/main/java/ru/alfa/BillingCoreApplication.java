package ru.alfa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Основной класс приложения для управления биллингом
 */
@SpringBootApplication
public class BillingCoreApplication {

    /**
     * Главный метод, который запускает приложение.
     *
     * @param args аргументы командной строки, переданные при запуске приложения.
     */
    public static void main(String[] args) {
        SpringApplication.run(BillingCoreApplication.class, args);
    }

}
