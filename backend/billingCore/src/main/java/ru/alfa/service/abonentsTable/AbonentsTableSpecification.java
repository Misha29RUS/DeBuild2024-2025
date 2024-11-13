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

public class AbonentsTableSpecification {

    public static Specification<PhoneNumber> hasPhoneNumber(String phoneNumber) {
        return (root, query, criteriaBuilder) ->
                phoneNumber == null ? null : criteriaBuilder.equal(root.get("phoneNumber"), phoneNumber);
    }

    public static Specification<PhoneNumber> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null) return null;
            Join<PhoneNumber, User> userJoin = root.join("user");
            return criteriaBuilder.equal(userJoin.get("name"), name);
        };
    }


    public static Specification<PhoneNumber> hasSurname(String surname) {
        return (root, query, criteriaBuilder) -> {
            if (surname == null) return null;
            Join<PhoneNumber, User> userJoin = root.join("user");
            return criteriaBuilder.equal(userJoin.get("surname"), surname);
        };

    }

    public static Specification<PhoneNumber> hasPatronymic(String patronymic) {
        return (root, query, criteriaBuilder) -> {
            if (patronymic == null) return null;
            Join<PhoneNumber, User> userJoin = root.join("user");
            return criteriaBuilder.equal(userJoin.get("patronymic"), patronymic);
        };
    }

    public static Specification<PhoneNumber> hasTariffsIds(List<Long> tariffsIds) {
        return (root, query, criteriaBuilder) -> {
            if (tariffsIds == null || tariffsIds.isEmpty()) return null;
            Join<PhoneNumber, PhoneNumberTariff> phoneNumberTariffJoin = root.join("phoneNumberTariff");
            Join<PhoneNumberTariff, Tariff> tariffJoin = phoneNumberTariffJoin.join("tariff");
            return tariffJoin.get("id").in(tariffsIds);
        };
    }

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
