package ru.alfa.data.entity.tariff;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;

import java.time.LocalDate;

/**
 * Смежная сущность {@link PhoneNumber} и {@link Tariff}
 */
@Getter
@Setter
@Entity
@Table(name = "phone_number_tariff")
public class PhoneNumberTariff {

    /**
     * Идентификатор
     */
    @Id
    @Column(name = "phone_number_id", nullable = false)
    private Long id;

    /**
     * Номер телефона, к которому подключен тариф
     */
    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "phone_number_id", nullable = false)
    private PhoneNumber phoneNumber;

    /**
     * Тариф
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tariff_id")
    private Tariff tariff;

    /**
     * Указатель, оплачен или нет
     */
    @Column(name = "is_active")
    private Boolean isActive;

    /**
     * Дата начала периода тарифа
     */
    @Column(name = "date_of_start_period")
    private LocalDate dateOfStartPeriod;

    /**
     * Дата окончания периода тарифа
     */
    @Column(name = "date_of_end_period")
    private LocalDate dateOfEndPeriod;

    /**
     * Остаток минут
     */
    @Column(name = "remaining_minutes")
    private Integer remainingMinutes;

    /**
     * Остаток смс
     */
    @Column(name = "remaining_sms")
    private Integer remainingSms;

    /**
     * Остаток гигабайт
     */
    @Column(name = "remaining_gigabytes")
    private Double remainingGigabytes;

    /**
     * Количество минут на начало периода тарифа
     */
    @Column(name = "count_minutes_at_start_of_period")
    private Integer countMinutesAtStartOfPeriod;

    /**
     * Количество смс на начало периода тарифа
     */
    @Column(name = "count_sms_at_start_of_period")
    private Integer countSmsAtStartOfPeriod;

    /**
     * Количетсво гигабайт на начало периода тарифа
     */
    @Column(name = "count_gigabytes_at_start_of_period")
    private Double countGigabytesAtStartOfPeriod;

}