package ru.alfa.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "history_of_transactions")
public class HistoryOfTransaction {
    @Id
    @Column(name = "phone_number_id", nullable = false)
    private Long id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "phone_number_id", nullable = false)
    private PhoneNumber phoneNumber;

    @Column(name = "name_of_transaction", length = Integer.MAX_VALUE)
    private String nameOfTransaction;

    @Column(name = "amount_of_transaction", precision = 10, scale = 2)
    private BigDecimal amountOfTransaction;
    @Column(name = "date_of_transaction")
    private Instant dateOfTransaction;

/*
 TODO [Reverse Engineering] create field to map the 'type_of_transaction' column
 Available actions: Define target Java type | Uncomment as is | Remove column mapping
    @Column(name = "type_of_transaction", columnDefinition = "history_type")
    private Object typeOfTransaction;
*/
}