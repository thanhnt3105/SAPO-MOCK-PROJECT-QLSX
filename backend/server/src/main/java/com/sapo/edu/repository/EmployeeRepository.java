package com.sapo.edu.repository;

import com.sapo.edu.entity.Employee;
import com.sapo.edu.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends BaseRepository<Employee, Long> {
    Optional<Employee> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByCode(String code);

    boolean existsByPhone(String phone);

    Optional<Employee> findByPhone(String phone);
}
