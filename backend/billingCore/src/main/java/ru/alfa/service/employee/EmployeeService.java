package ru.alfa.service.employee;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alfa.data.dto.employee.RequestEmployeeDto;
import ru.alfa.data.dto.employee.ResponseEmployeeDto;
import ru.alfa.data.entity.employee.Employee;
import ru.alfa.data.entity.employee.EmployeesCredential;
import ru.alfa.data.entity.employee.enums.EmployeeStatus;
import ru.alfa.data.repository.employee.EmployeeRepository;
import ru.alfa.data.repository.employee.EmployeesCredentialRepository;
import ru.alfa.exception.CreateException;
import ru.alfa.exception.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final EmployeesCredentialRepository employeesCredentialRepository;

    public List<ResponseEmployeeDto> getAllApprovedEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(employee -> new ResponseEmployeeDto(
                        employee.getId(),
                        employee.getEmployeesCredential().getEmail(),
                        employee.getEmployeesCredential().getRole(),
                        employee.getName(),
                        employee.getSurname(),
                        employee.getPatronymic()
                ))
                .toList();
    }

    @Transactional
    public ResponseEmployeeDto createNewApprovedEmployee(RequestEmployeeDto requestEmployeeDto) {
        Optional<EmployeesCredential> employeeDb = employeesCredentialRepository.findByEmail(requestEmployeeDto.email());
        if (employeeDb.isPresent()) {
            throw new CreateException("Сотрудник с таким email уже существует");
        }
        Employee employee = Employee.builder().
                name(requestEmployeeDto.firstName()).
                surname(requestEmployeeDto.lastName()).
                patronymic(requestEmployeeDto.patronymic()).build();
        EmployeesCredential employeesCredential = EmployeesCredential.builder().
                role(requestEmployeeDto.role()).
                email(requestEmployeeDto.email()).
                status(EmployeeStatus.APPROVED_TO_REGISTRATION).
                createdAt(LocalDateTime.now()).
                updatedAt(LocalDateTime.now()).
                employee(employee).build();
        employee.setEmployeesCredential(employeesCredential);

        Employee newEmployee = employeeRepository.save(employee);
        return new ResponseEmployeeDto(
                newEmployee.getId(),
                newEmployee.getEmployeesCredential().getEmail(),
                newEmployee.getEmployeesCredential().getRole(),
                newEmployee.getName(),
                newEmployee.getSurname(),
                newEmployee.getPatronymic()
        );
    }

    @Transactional
    public ResponseEmployeeDto updateApprovedEmployee(Long id,
                                                      RequestEmployeeDto requestEmployeeDto) {
        Employee employeeDb = employeeRepository.
                findById(id).
                orElseThrow(() -> new EntityNotFoundException("Employee", id));

        employeeDb.setName(requestEmployeeDto.firstName());
        employeeDb.setSurname(requestEmployeeDto.lastName());
        employeeDb.setPatronymic(requestEmployeeDto.patronymic());
        employeeDb.getEmployeesCredential().setRole(requestEmployeeDto.role());
        employeeDb.getEmployeesCredential().setEmail(requestEmployeeDto.email());

        Employee newEmployee = employeeRepository.save(employeeDb);
        return new ResponseEmployeeDto(
                newEmployee.getId(),
                newEmployee.getEmployeesCredential().getEmail(),
                newEmployee.getEmployeesCredential().getRole(),
                newEmployee.getName(),
                newEmployee.getSurname(),
                newEmployee.getPatronymic()
        );
    }

    public void deleteEmployeeById(Long id) {
        employeeRepository.deleteById(id);
    }
}
