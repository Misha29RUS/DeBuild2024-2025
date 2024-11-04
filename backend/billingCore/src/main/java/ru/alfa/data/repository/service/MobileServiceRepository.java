package ru.alfa.data.repository.service;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.service.MobileService;

public interface MobileServiceRepository extends JpaRepository<MobileService, Long> {
}