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

@Getter
@Setter
@Entity
@Table(name = "phone_number")
public class PhoneNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "phone_number_id", nullable = false)
    private Long id;

    @Column(name = "phone_number", length = Integer.MAX_VALUE)
    private String phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "balance", precision = 10, scale = 2)
    private BigDecimal balance;

    @OneToMany(mappedBy = "phoneNumber")
    private List<HistoryOfTransaction> historyOfTransaction = new ArrayList<>();

    @OneToMany(mappedBy = "phoneNumber")
    private Set<PhoneNumberMobileService> phoneNumberMobileServices = new LinkedHashSet<>();

    @OneToOne(mappedBy = "phoneNumber")
    private PhoneNumberTariff phoneNumberTariff;

}