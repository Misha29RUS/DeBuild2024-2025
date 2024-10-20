package ru.alfa.data.repository.tariff;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.tariff.PhoneNumberTariff;

public interface PhoneNumberTariffRepository extends JpaRepository<PhoneNumberTariff, Long> {
}