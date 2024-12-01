package ru.alfa.data.repository.tariff;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.tariff.TariffResource;

/**
 * Репозиторий для работы с сущностью {@link TariffResource}
 */
public interface TariffResourceRepository extends JpaRepository<TariffResource, Long> {
}