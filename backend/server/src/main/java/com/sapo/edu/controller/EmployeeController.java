package com.sapo.edu.controller;

import com.sapo.edu.controller.base.BaseController;
import com.sapo.edu.mapper.dto.EmployeeDTOMapper;
import com.sapo.edu.mapper.request.EmployeeRequestMapper;
import com.sapo.edu.payload.request.EmployeeRequest;
import com.sapo.edu.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1")
public class EmployeeController implements BaseController<EmployeeRequest> {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeRequestMapper requestMapper;
    @Autowired
    private EmployeeDTOMapper dtoMapper;

    @Override
    @GetMapping("/employees")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> all() {
        return ResponseEntity.ok(dtoMapper.toEmployeeDTOs(employeeService.findAll()));
    }

    @Override
    @GetMapping("/employees/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> one(Long id) {
        return ResponseEntity.ok().body(dtoMapper.toEmployeeDTO(employeeService.findById(id)));
    }

    @Override
    @PostMapping("/employees")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> create(@Valid @RequestBody EmployeeRequest entityRequest) {
        return ResponseEntity.ok(dtoMapper.toEmployeeDTO(employeeService.save(requestMapper.toEmployee(entityRequest))));
    }

    @Override
    @PutMapping("/employees/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(EmployeeRequest entity, Long id) {
        return ResponseEntity.ok(dtoMapper.toEmployeeDTO(employeeService.updateById(id, requestMapper.toEmployee(entity))));
    }

    @Override
    @DeleteMapping("/employees/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(Long id) {
        employeeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/employees/paging")
    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> all(int page, int size) {
        return ResponseEntity.ok(employeeService.findAllPaging(page, size));
    }
}
