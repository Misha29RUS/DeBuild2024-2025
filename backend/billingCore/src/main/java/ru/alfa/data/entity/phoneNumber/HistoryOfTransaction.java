package ru.alfa.data.entity.phoneNumber;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.phoneNumber.enums.HistoryType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "history_of_transactions")
public class HistoryOfTransaction {

    @Id
    @Column(name = "transaction_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "phone_number_id")
    private PhoneNumber phoneNumber;

    @Column(name = "name_of_transaction", length = Integer.MAX_VALUE)
    private String nameOfTransaction;

    @Column(name = "amount_of_transaction", precision = 10, scale = 2)
    private BigDecimal amountOfTransaction;

    @Column(name = "date_of_transaction")
    private LocalDateTime dateOfTransaction;

    @Column(name = "type_of_transaction", columnDefinition = "history_type")
    @Enumerated(EnumType.STRING)
    private HistoryType typeOfTransaction;

}