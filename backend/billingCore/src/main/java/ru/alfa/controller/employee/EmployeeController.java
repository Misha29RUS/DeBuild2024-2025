package ru.alfa.controller.employee;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alfa.data.dto.employee.RequestEmployeeDto;
import ru.alfa.data.dto.employee.ResponseEmployeeDto;
import ru.alfa.service.employee.EmployeeService;

import java.util.List;

@Tag(name = "Контроллер для работы с подчинёнными")
@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Validated
public class EmployeeController {

    private final EmployeeService employeeService;

    @Operation(
            summary = "Получить всех одобренных для регистрации сотрудников",
            description = "Возвращает список всех одобренных для регистрации сотрудников."
    )
    @GetMapping
    public ResponseEntity<List<ResponseEmployeeDto>> getAllApprovedEmployees() {
        List<ResponseEmployeeDto> employees = employeeService.getAllApprovedEmployees();
        return ResponseEntity.ok(employees);
    }

    @Operation(
            summary = "Создать нового одобренного сотрудника",
            description = "Создает нового одобренного сотрудника на основе предоставленных данных."
    )
    @PostMapping
    public ResponseEntity<ResponseEmployeeDto> createEmployee(
            @RequestBody @Validated RequestEmployeeDto requestEmployeeDto) {
        ResponseEmployeeDto responseEmployeeDto =
                employeeService.createNewApprovedEmployee(requestEmployeeDto);
        return ResponseEntity.ok(responseEmployeeDto);
    }

    @Operation(
            summary = "Обновить информацию о одобренном сотруднике",
            description = "Обновляет информацию о одобренном для регистрации сотруднике по указанному идентификатору."
    )
    @PutMapping("/{id}")
    public ResponseEntity<ResponseEmployeeDto> updateEmployee(
            @PathVariable("id") Long id,
            @RequestBody @Validated RequestEmployeeDto requestEmployeeDto) {
        ResponseEmployeeDto updatedEmployee =
                employeeService.updateApprovedEmployee(id, requestEmployeeDto);
        return ResponseEntity.ok(updatedEmployee);
    }

    @Operation(
            summary = "Удалить сотрудника",
            description = "Удаляет сотрудника из списка одобренных для регистрации по указанному идентификатору."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployeeById(id);
        return ResponseEntity.noContent().build();
    }
}
