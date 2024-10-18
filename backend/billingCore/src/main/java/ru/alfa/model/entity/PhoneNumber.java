package ru.alfa.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
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

    @OneToOne(mappedBy = "phoneNumber")
    private HistoryOfTransaction historyOfTransaction;

    @OneToMany(mappedBy = "phoneNumber")
    private Set<PhoneNumberService> phoneNumberServices = new LinkedHashSet<>();

    @OneToOne(mappedBy = "phoneNumber")
    private PhoneNumberTariff phoneNumberTariff;

}