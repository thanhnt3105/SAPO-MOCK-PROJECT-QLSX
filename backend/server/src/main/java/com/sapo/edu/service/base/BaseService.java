package com.sapo.edu.service.base;

import com.sapo.edu.entity.base.BaseEntity;

import java.util.List;
import java.util.Optional;

public interface BaseService<T extends BaseEntity> {
    List<T> findAll();
    T findById(Long id);
    T save(T entity);
    T updateById(Long id, T newEntity);
    void deleteById(Long id);
}
