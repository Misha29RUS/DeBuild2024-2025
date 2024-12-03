package ru.alfa.service.tariff;

import org.springframework.data.jpa.domain.Specification;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.entity.tariff.enums.TariffStatus;
import ru.alfa.data.entity.tariff.enums.TariffType;

/**
 * Спецификации для фильтрации тарифов.
 * Этот класс содержит статические методы для создания спецификаций, которые могут быть использованы
 * для фильтрации тарифов по имени, типу и статусу.
 */
public class TariffTableSpecification {

    /**
     * Создает спецификацию для фильтрации тарифов по имени.
     *
     * @param name Имя тарифа, по которому будет производиться фильтрация.
     * @return Спецификация, которая фильтрует тарифы по имени.
     * Если имя равно null, возвращает null.
     */
    public static Specification<Tariff> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null) return null;
            return criteriaBuilder.equal(root.get("name"), name);
        };
    }

    /**
     * Создает спецификацию для фильтрации тарифов по типу.
     *
     * @param type Тип тарифа, по которому будет производиться фильтрация.
     * @return Спецификация, которая фильтрует тарифы по типу.
     * Если тип равен null, возвращает null.
     */
    public static Specification<Tariff> hasType(TariffType type) {
        return (root, query, criteriaBuilder) -> {
            if (type == null) return null;
            return criteriaBuilder.equal(root.get("type"), type);
        };
    }

    /**
     * Создает спецификацию для фильтрации тарифов по статусу.
     *
     * @param status Статус тарифа, по которому будет производиться фильтрация.
     * @return Спецификация, которая фильтрует тарифы по статусу.
     * Если статус равен null, возвращает null.
     */
    public static Specification<Tariff> hasStatus(TariffStatus status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null) return null;
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }
}
