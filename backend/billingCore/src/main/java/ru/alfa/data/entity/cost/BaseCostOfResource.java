package ru.alfa.data.entity.cost;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Сущность хранения базовых стоимостей ресурсов
 */
@Getter
@Setter
@Entity
@Table(name = "base_cost_of_resources")
public class BaseCostOfResource {

    /**
     * Идентификатор
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    /**
     * Стоимость одной минуты
     */
    @Column(name = "cost_one_minute", precision = 10, scale = 2)
    private BigDecimal costOneMinute;

    /**
     * Стоимость одного смс
     */
    @Column(name = "cost_one_sms", precision = 10, scale = 2)
    private BigDecimal costOneSms;

    /**
     * Стоимость одного гигабайта
     */
    @Column(name = "cost_one_gigabyte", precision = 10, scale = 2)
    private BigDecimal costOneGigabyte;

}