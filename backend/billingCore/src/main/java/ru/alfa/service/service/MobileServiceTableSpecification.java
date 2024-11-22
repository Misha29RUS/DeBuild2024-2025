package ru.alfa.service.service;

import org.springframework.data.jpa.domain.Specification;
import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.entity.service.enums.ResourceType;

public class MobileServiceTableSpecification {

    public static Specification<MobileService> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null) return null;
            return criteriaBuilder.equal(root.get("name"), name);
        };
    }

    public static Specification<MobileService> hasType(ResourceType type) {
        return (root, query, criteriaBuilder) -> {
            if (type == null) return null;
            return criteriaBuilder.equal(root.get("type"), type);
        };
    }

    public static Specification<MobileService> hasTimesService(Boolean oneTimeService) {
        return (root, query, criteriaBuilder) -> {
            if (oneTimeService == null) return null;
            return criteriaBuilder.equal(root.get("oneTimeService"), oneTimeService);
        };
    }

    public static Specification<MobileService> hasStatusActive() {
        return (root, query, criteriaBuilder)
                -> criteriaBuilder.equal(root.get("status"), "ACTIVE");
    }

}
