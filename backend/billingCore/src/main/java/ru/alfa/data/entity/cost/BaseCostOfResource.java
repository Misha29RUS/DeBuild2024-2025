package ru.alfa.data.entity.cost;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "base_cost_of_resources")
public class BaseCostOfResource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "cost_one_minute", precision = 10, scale = 2)
    private BigDecimal costOneMinute;

    @Column(name = "cost_one_sms", precision = 10, scale = 2)
    private BigDecimal costOneSms;

    @Column(name = "cost_one_gigabyte", precision = 10, scale = 2)
    private BigDecimal costOneGigabyte;

}