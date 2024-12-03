package ru.alfa.service.abonentsTable;

import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;
import ru.alfa.data.entity.service.MobileService;
import ru.alfa.data.entity.service.PhoneNumberMobileService;
import ru.alfa.data.entity.tariff.PhoneNumberTariff;
import ru.alfa.data.entity.tariff.Tariff;
import ru.alfa.data.entity.user.User;

import java.util.List;

/**
 * Спецификации для фильтрации абонентов по различным критериям.
 * Этот класс содержит статические методы для создания спецификаций, которые могут быть использованы
 * для фильтрации абонентов на основе номера телефона, имени, фамилии, отчеств, идентификаторов тарифов и мобильных услуг.
 */
public class AbonentsTableSpecification {

    /**
     * Создает спецификацию для фильтрации абонентов по номеру телефона.
     *
     * @param phoneNumber Номер телефона, по которому будет производиться фильтрация.
     * @return Спецификация, которая фильтрует абонентов по номеру телефона.
     * Если номер телефона равен null, возвращает null.
     */
    public static Specification<PhoneNumber> hasPhoneNumber(String phoneNumber) {
        return (root, query, criteriaBuilder) ->
                phoneNumber == null ? null : criteriaBuilder.equal(root.get("phoneNumber"), phoneNumber);
    }

    /**
     * Создает спецификацию для фильтрации абонентов по имени.
     *
     * @param name Имя абонента, по которому будет производиться фильтрация.
     * @return Спецификация, которая фильтрует абонентов по имени.
     * Если имя равно null, возвращает null.
     */
    public static Specification<PhoneNumber> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null) return null;
            Join<PhoneNumber, User> userJoin = root.join("user");
            return criteriaBuilder.equal(userJoin.get("name"), name);
        };
    }

    /**
     * Создает спецификацию для фильтрации абонентов по фамилии.
     *
     * @param surname Фамилия абонента, по которой будет производиться фильтрация.
     * @return Спецификация, которая фильтрует абонентов по фамилии.
     * Если фамилия равна null, возвращает null.
     */
    public static Specification<PhoneNumber> hasSurname(String surname) {
        return (root, query, criteriaBuilder) -> {
            if (surname == null) return null;
            Join<PhoneNumber, User> userJoin = root.join("user");
            return criteriaBuilder.equal(userJoin.get("surname"), surname);
        };

    }

    /**
     * Создает спецификацию для фильтрации абонентов по отчеству.
     *
     * @param patronymic Отчество абонента, по которому будет производиться фильтрация.
     * @return Спецификация, которая фильтрует абонентов по отчеству.
     * Если отчество равно null, возвращает null.
     */
    public static Specification<PhoneNumber> hasPatronymic(String patronymic) {
        return (root, query, criteriaBuilder) -> {
            if (patronymic == null) return null;
            Join<PhoneNumber, User> userJoin = root.join("user");
            return criteriaBuilder.equal(userJoin.get("patronymic"), patronymic);
        };
    }

    /**
     * Создает спецификацию для фильтрации абонентов по идентификаторам тарифов.
     *
     * @param tariffsIds Список идентификаторов тарифов для фильтрации абонентов.
     * @return Спецификация, которая фильтрует абонентов по идентификаторам тарифов.
     * Если список идентификаторов равен null или пустой, возвращает null.
     */
    public static Specification<PhoneNumber> hasTariffsIds(List<Long> tariffsIds) {
        return (root, query, criteriaBuilder) -> {
            if (tariffsIds == null || tariffsIds.isEmpty()) return null;
            Join<PhoneNumber, PhoneNumberTariff> phoneNumberTariffJoin = root.join("phoneNumberTariff");
            Join<PhoneNumberTariff, Tariff> tariffJoin = phoneNumberTariffJoin.join("tariff");
            return tariffJoin.get("id").in(tariffsIds);
        };
    }

    /**
     * Создает спецификацию для фильтрации абонентов по идентификаторам мобильных услуг.
     *
     * @param mobileServicesIds Список идентификаторов мобильных услуг для фильтрации абонентов.
     * @return Спецификация, которая фильтрует абонентов по идентификаторам мобильных услуг.
     * Если список идентификаторов равен null или пустой, возвращает null.
     */
    public static Specification<PhoneNumber> hasMobileServicesIds(List<Long> mobileServicesIds) {
        return (root, query, criteriaBuilder) -> {
            if (mobileServicesIds == null || mobileServicesIds.isEmpty()) return null;
            Join<PhoneNumber, PhoneNumberMobileService> phoneNumberPhoneNumberMobileServiceJoin =
                    root.join("phoneNumberMobileServices");
            Join<PhoneNumberMobileService, MobileService> mobileServiceJoin =
                    phoneNumberPhoneNumberMobileServiceJoin.join("mobileService");
            return mobileServiceJoin.get("id").in(mobileServicesIds);
        };
    }
}
