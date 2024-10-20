package ru.alfa.data.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.employee.EmployeesCredential;

public interface EmployeesCredentialRepository extends JpaRepository<EmployeesCredential, Long> {
}