package ru.alfa.service.tariff;

import org.springframework.data.jpa.domain.Specification;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.entity.tariff.enums.TariffStatus;
import ru.alfa.data.entity.tariff.enums.TariffType;

public class TariffTableSpecification {

    public static Specification<Tariff> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null) return null;
            return criteriaBuilder.equal(root.get("name"), name);
        };
    }

    public static Specification<Tariff> hasType(TariffType type) {
        return (root, query, criteriaBuilder) -> {
            if (type == null) return null;
            return criteriaBuilder.equal(root.get("type"), type);
        };
    }

    public static Specification<Tariff> hasStatus(TariffStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null) return null;
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }
}
