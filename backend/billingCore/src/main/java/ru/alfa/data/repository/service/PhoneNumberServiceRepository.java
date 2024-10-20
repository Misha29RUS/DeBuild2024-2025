package ru.alfa.data.repository.service;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.service.PhoneNumberService;
import ru.alfa.data.entity.service.PhoneNumberServiceId;

public interface PhoneNumberServiceRepository extends JpaRepository<PhoneNumberService, PhoneNumberServiceId> {
}