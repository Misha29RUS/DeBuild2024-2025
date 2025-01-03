package ru.alfa.data.repository.cost;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.cost.BaseCostOfResource;

/**
 * Репозиторий для работы с сущностью {@link BaseCostOfResource}
 */
public interface BaseCostOfResourceRepository extends JpaRepository<BaseCostOfResource, Long> {
}