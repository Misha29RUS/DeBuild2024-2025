package ru.alfa.data.repository.service;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.service.PhoneNumberMobileService;
import ru.alfa.data.entity.service.PhoneNumberServiceId;

/**
 * Репозиторий для работы с сущностью {@link PhoneNumberMobileService}
 */
public interface PhoneNumberServiceRepository extends JpaRepository<PhoneNumberMobileService, PhoneNumberServiceId> {
}