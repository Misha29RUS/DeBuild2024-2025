package ru.alfa.data.repository.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import ru.alfa.data.entity.service.MobileService;

/**
 * Репозиторий для работы с сущностью {@link MobileService}
 */
public interface MobileServiceRepository extends JpaRepository<MobileService, Long>,
        JpaSpecificationExecutor<MobileService> {
}