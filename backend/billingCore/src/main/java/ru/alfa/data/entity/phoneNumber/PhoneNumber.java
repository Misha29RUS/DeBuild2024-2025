package ru.alfa.data.entity.phoneNumber;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.service.PhoneNumberMobileService;
import ru.alfa.data.entity.tariff.PhoneNumberTariff;
import ru.alfa.data.entity.user.User;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * Сущность номера телефона
 */
@Getter
@Setter
@Entity
@Table(name = "phone_number")
public class PhoneNumber {

    /**
     * Идентификатор номера телефона
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "phone_number_id", nullable = false)
    private Long id;

    /**
     * Номер телефона
     */
    @Column(name = "phone_number", length = Integer.MAX_VALUE)
    private String phoneNumber;

    /**
     * Пользователь, с которым связан номер телефона
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * Баланс номера телефона
     */
    @Column(name = "balance", precision = 10, scale = 2)
    private BigDecimal balance;

    /**
     * История транзакций
     */
    @OneToMany(mappedBy = "phoneNumber")
    private List<HistoryOfTransaction> historyOfTransaction = new ArrayList<>();

    /**
     * Подключенные услуги
     */
    @OneToMany(mappedBy = "phoneNumber")
    private Set<PhoneNumberMobileService> phoneNumberMobileServices = new LinkedHashSet<>();

    /**
     * Подключенный тариф
     */
    @OneToOne(mappedBy = "phoneNumber")
    private PhoneNumberTariff phoneNumberTariff;

}