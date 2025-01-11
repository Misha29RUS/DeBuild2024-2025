package ru.alfa.data.mapper.employee;

import org.mapstruct.Mapper;
import ru.alfa.data.dto.employee.ResponseEmployeeDto;
import ru.alfa.data.entity.employee.Employee;

@Mapper(componentModel = "spring")

public interface EmployeeMapper {

    ResponseEmployeeDto toDto(Employee employee);

}
