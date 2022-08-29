package com.sapo.edu.service.impl;

import com.sapo.edu.dto.EmployeeDTO;
import com.sapo.edu.entity.Employee;
import com.sapo.edu.exception.DuplicateEntityException;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.mapper.dto.EmployeeMapper;
import com.sapo.edu.payload.request.EmployeeRequest;
import com.sapo.edu.repository.EmployeeRepository;
import com.sapo.edu.service.EmployeeService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class EmployeeServiceImpl extends BaseServiceImpl<Employee> implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        super(employeeRepository);
    }

    @Override
    @Transactional
    public Employee save(Employee newEntity) {
        if (employeeRepository.existsByPhone(newEntity.getPhone()))
            throw new DuplicateEntityException(EmployeeRequest.class, "phone", newEntity.getPhone());
        if (employeeRepository.existsByUsername(newEntity.getUsername()))
            throw new DuplicateEntityException(EmployeeRequest.class, "username", newEntity.getUsername());
        newEntity.setCreatedDate(LocalDateTime.now());

        return super.save(newEntity);
    }

    @Override
    @Transactional
    public Employee updateById(Long id, Employee newEntity) {
        Employee oldEntity = this.findById(id);
        // this field cannot update
        newEntity.setId(oldEntity.getId());
        newEntity.setCode(oldEntity.getCode());
        newEntity.setRoles(oldEntity.getRoles());
        newEntity.setUsername(oldEntity.getUsername());
        newEntity.setPassword(oldEntity.getPassword());
        newEntity.setCreatedDate(oldEntity.getCreatedDate());

        if (employeeRepository.existsByPhone(newEntity.getPhone())) {
            Employee existed = employeeRepository.findByPhone(newEntity.getPhone()).get();
            if (!existed.getId().equals(newEntity.getId()))
                throw new DuplicateEntityException(EmployeeRequest.class, "phone", newEntity.getPhone());
        }

        newEntity.setUpdatedDate(LocalDateTime.now());

        return employeeRepository.save(newEntity);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Optional<Employee> optional = Optional.ofNullable(this.findById(id));
        optional.map(entity -> {
            if (!entity.getUsername().equals("superuser")) {
                    employeeRepository.deleteById(id);
                    return id;
            }
            throw new AccessDeniedException("You cannot delete superuser");
                })
                .orElseThrow(() -> new EntityNotFoundException(EmployeeRequest.class, "id", id.toString()));
    }

    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Employee> employeesPerPage;
        List<EmployeeDTO> employeeDTOs;

        employeesPerPage = employeeRepository.findAll(pageable);
        employeeDTOs = EmployeeMapper.toEmployeeDTOs(employeesPerPage.getContent());

        // response
        Map<String, Object> response = new HashMap<>();
        response.put("currentPage", employeesPerPage.getNumber());
        response.put("totalPages", employeesPerPage.getTotalPages());
        response.put("totalItems", employeesPerPage.getTotalElements());
        response.put("listOfCategories", employeeDTOs);

        return response;
    }
}
