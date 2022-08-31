package com.sapo.edu.repository;

import com.sapo.edu.entity.Category;
import com.sapo.edu.repository.base.BaseRepository;

public interface CategoryRepository extends BaseRepository<Category, Long> {
    boolean existsByCode(String code);
}
