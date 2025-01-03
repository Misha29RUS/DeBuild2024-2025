package ru.alfa.data.repository.tariff;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ru.alfa.data.entity.tariff.Tariff;

import java.util.Optional;

/**
 * Репозиторий для работы с сущностью {@link Tariff}
 */
public interface TariffRepository extends JpaRepository<Tariff, Long>, JpaSpecificationExecutor<Tariff> {
    Optional<Tariff> findByName(String name);
}