package ru.alfa.data.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.employee.EmployeesCredential;

import java.util.Optional;

/**
 * Репозиторий для работы с сущностью {@link EmployeesCredential}
 */
public interface EmployeesCredentialRepository extends JpaRepository<EmployeesCredential, Long> {
    Optional<EmployeesCredential> findByEmail(String email);
}