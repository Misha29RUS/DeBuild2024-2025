package ru.alfa.data.repository.phoneNumber;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.phoneNumber.PhoneNumber;

public interface PhoneNumberRepository extends JpaRepository<PhoneNumber, Long> {
}