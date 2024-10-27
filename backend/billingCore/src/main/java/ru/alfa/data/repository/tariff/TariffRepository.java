package ru.alfa.data.repository.tariff;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.tariff.Tariff;

public interface TariffRepository extends JpaRepository<Tariff, Long> {

    Tariff getTariffById(Long id);

    void deleteTariffById(Long id);
}