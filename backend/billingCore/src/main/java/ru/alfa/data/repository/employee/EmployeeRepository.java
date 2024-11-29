package ru.alfa.data.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.employee.Employee;

/**
 * Репозиторий для работы с сущностью {@link Employee}.
 */
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}