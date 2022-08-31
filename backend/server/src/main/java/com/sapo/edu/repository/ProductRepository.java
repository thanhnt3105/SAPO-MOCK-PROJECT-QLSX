package com.sapo.edu.repository;

import com.sapo.edu.entity.Product;
import com.sapo.edu.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends BaseRepository<Product, Long> {
    boolean existsByCode(String code);

    List<Product> findProductsByModelsId(Long modelId);
}
