package ru.alfa.data.entity.tariff;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.alfa.data.mapper.tariff.JsonConverter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tariff_resources")
public class TariffResource {

    @Id
    @Column(name = "tariff_id", nullable = false)
    private Long id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tariff_id", nullable = false)
    private Tariff tariff;

    @Column(name = "count_minutes")
    private Integer countMinutes;

    @Column(name = "cost_one_minute", precision = 10, scale = 2)
    private BigDecimal costOneMinute;

    @Column(name = "steps_minutes", columnDefinition = "jsonb")
    @Convert(converter = JsonConverter.class)
    private List<Integer> stepsMinutes;

    @Column(name = "count_sms")
    private Integer countSms;

    @Column(name = "cost_one_sms", precision = 10, scale = 2)
    private BigDecimal costOneSms;

    @Column(name = "steps_sms", columnDefinition = "jsonb")
    @Convert(converter = JsonConverter.class)
    private List<Integer> stepsSms;

    @Column(name = "count_gigabytes")
    private Double countGigabytes;

    @Column(name = "cost_one_gigabyte", precision = 10, scale = 2)
    private BigDecimal costOneGigabyte;

    @Column(name = "steps_gigabytes", columnDefinition = "jsonb")
    @Convert(converter = JsonConverter.class)
    private List<Integer> stepsGigabytes;

}