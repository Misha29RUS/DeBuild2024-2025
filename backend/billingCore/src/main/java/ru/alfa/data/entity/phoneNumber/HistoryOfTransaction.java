package ru.alfa.data.entity.phoneNumber;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.phoneNumber.enums.HistoryType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Сущность истории транзакций
 */
@Getter
@Setter
@Entity
@Table(name = "history_of_transactions")
public class HistoryOfTransaction {

    /**
     * Идентификатор транзакции
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id", nullable = false)
    private Long id;

    /**
     * Номер телефона
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "phone_number_id")
    private PhoneNumber phoneNumber;

    /**
     * Наименование транзакции
     */
    @Column(name = "name_of_transaction", length = Integer.MAX_VALUE)
    private String nameOfTransaction;

    /**
     * Сумма транзакции
     */
    @Column(name = "amount_of_transaction", precision = 10, scale = 2)
    private BigDecimal amountOfTransaction;

    /**
     * Дата транзакции
     */
    @Column(name = "date_of_transaction")
    private LocalDateTime dateOfTransaction;

    /**
     * Тип транзакции
     */
    @Column(name = "type_of_transaction", columnDefinition = "history_type")
    @Enumerated(EnumType.STRING)
    private HistoryType typeOfTransaction;

}