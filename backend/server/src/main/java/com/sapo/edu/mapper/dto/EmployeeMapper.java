package com.sapo.edu.mapper.dto;

import com.sapo.edu.dto.EmployeeDTO;
import com.sapo.edu.entity.Employee;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class EmployeeMapper {
    private static final ModelMapper mapper = new ModelMapper();

    public static EmployeeDTO toEmployeeDTO(Employee employee) {
        return mapper.map(employee, EmployeeDTO.class);
    }

    public static List<EmployeeDTO> toEmployeeDTOs(List<Employee> employees) {
        return employees
                .stream()
                .map(employee -> mapper.map(employee, EmployeeDTO.class))
                .collect(Collectors.toList());
    }
}
