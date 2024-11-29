package ru.alfa.data.entity.tariff;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.mapper.tariff.JsonConverter;

import java.math.BigDecimal;
import java.util.List;

/**
 * Ресурсы тарифа
 */
@Getter
@Setter
@Entity
@Table(name = "tariff_resources")
public class TariffResource {

    /**
     * Идентификатор
     */
    @Id
    @Column(name = "tariff_id", nullable = false)
    private Long id;

    /**
     * Тариф
     */
    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tariff_id", nullable = false)
    private Tariff tariff;

    /**
     * Количество минут
     */
    @Column(name = "count_minutes")
    private Integer countMinutes;

    /**
     * Стоимость одной минуты
     */
    @Column(name = "cost_one_minute", precision = 10, scale = 2)
    private BigDecimal costOneMinute;

    /**
     * Шаг минут (для настраиваемого тарифа)
     */
    @Column(name = "steps_minutes", columnDefinition = "jsonb")
    @Convert(converter = JsonConverter.class)
    private List<Integer> stepsMinutes;

    /**
     * Количество смс
     */
    @Column(name = "count_sms")
    private Integer countSms;

    /**
     * Стоимость одной смс
     */
    @Column(name = "cost_one_sms", precision = 10, scale = 2)
    private BigDecimal costOneSms;

    /**
     * Шаг смс (для настраиваемого тарифа)
     */
    @Column(name = "steps_sms", columnDefinition = "jsonb")
    @Convert(converter = JsonConverter.class)
    private List<Integer> stepsSms;

    /**
     * Количество гигабайт
     */
    @Column(name = "count_gigabytes")
    private Double countGigabytes;

    /**
     * Стоимость одного гигабайта
     */
    @Column(name = "cost_one_gigabyte", precision = 10, scale = 2)
    private BigDecimal costOneGigabyte;

    /**
     * Шаг гигабайт (для настраиваемого тарифа)
     */
    @Column(name = "steps_gigabytes", columnDefinition = "jsonb")
    @Convert(converter = JsonConverter.class)
    private List<Integer> stepsGigabytes;

}