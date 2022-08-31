package com.sapo.edu.repository;

import com.sapo.edu.entity.Service;
import com.sapo.edu.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends BaseRepository<Service, Long> {
    boolean existsByCode(String code);
}
