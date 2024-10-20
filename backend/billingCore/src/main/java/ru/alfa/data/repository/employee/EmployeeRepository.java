package ru.alfa.data.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.alfa.data.entity.employee.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}