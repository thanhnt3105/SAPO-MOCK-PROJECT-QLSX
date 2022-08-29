package com.sapo.edu.service;

import com.sapo.edu.entity.Employee;
import com.sapo.edu.payload.request.EmployeeRequest;
import com.sapo.edu.service.base.BaseService;

import java.util.Map;

public interface EmployeeService extends BaseService<Employee> {
    Map<String, Object> findAllPaging(int page, int size);
}
