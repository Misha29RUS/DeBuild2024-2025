package ru.alfa.service.service;

import org.springframework.data.jpa.domain.Specification;
import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.entity.service.enums.ResourceType;

/**
 * Спецификации для фильтрации мобильных услуг.
 * Этот класс содержит статические методы для создания спецификаций, которые могут быть использованы
 * для фильтрации мобильных услуг по имени, типу, одноразовости и статусу.
 */
public class MobileServiceTableSpecification {

    /**
     * Создает спецификацию для фильтрации мобильных услуг по имени.
     *
     * @param name Имя мобильной услуги, по которому будет производиться фильтрация.
     * @return Спецификация, которая фильтрует мобильные услуги по имени.
     * Если имя равно null, возвращает null.
     */
    public static Specification<MobileService> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null) return null;
            return criteriaBuilder.like(root.get("name"), name + "%");
        };
    }

    /**
     * Создает спецификацию для фильтрации мобильных услуг по типу.
     *
     * @param type Тип мобильной услуги, по которому будет производиться фильтрация.
     * @return Спецификация, которая фильтрует мобильные услуги по типу.
     * Если тип равен null, возвращает null.
     */
    public static Specification<MobileService> hasType(ResourceType type) {
        return (root, query, criteriaBuilder) -> {
            if (type == null) return null;
            return criteriaBuilder.equal(root.get("type"), type);
        };
    }

    /**
     * Создает спецификацию для фильтрации мобильных услуг по одноразовости.
     *
     * @param oneTimeService Флаг, указывающий на одноразовую услугу.
     * @return Спецификация, которая фильтрует мобильные услуги по одноразовости.
     * Если флаг равен null, возвращает null.
     */
    public static Specification<MobileService> hasTimesService(Boolean oneTimeService) {
        return (root, query, criteriaBuilder) -> {
            if (oneTimeService == null) return null;
            return criteriaBuilder.equal(root.get("oneTimeService"), oneTimeService);
        };
    }

    /**
     * Создает спецификацию для фильтрации активных мобильных услуг.
     *
     * @return Спецификация, которая фильтрует только активные мобильные услуги.
     */
    public static Specification<MobileService> hasStatusActive() {
        return (root, query, criteriaBuilder)
                -> criteriaBuilder.equal(root.get("status"), "ACTIVE");
    }

}
