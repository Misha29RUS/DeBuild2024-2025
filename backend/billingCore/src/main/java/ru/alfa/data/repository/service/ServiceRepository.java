package ru.alfa.data.repository.service;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.service.Service;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}