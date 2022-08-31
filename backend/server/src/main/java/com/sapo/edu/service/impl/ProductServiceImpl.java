package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Product;
import com.sapo.edu.mapper.dto.ProductDTOMapper;
import com.sapo.edu.repository.ProductRepository;
import com.sapo.edu.service.ProductService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl extends BaseServiceImpl<Product> implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductDTOMapper dtoMapper;

    public ProductServiceImpl(ProductRepository productRepository) {
        super(productRepository);
    }

    @Override
    @Transactional
    public Product save(Product newEntity) {
        newEntity.setCreatedDate(LocalDateTime.now());
        return super.save(newEntity);
    }

    @Override
    @Transactional
    public Product updateById(Long id, Product newEntity) {
        Product oldEntity = this.findById(id);
        // this field cannot update
        newEntity.setId(oldEntity.getId());
        newEntity.setCode(oldEntity.getCode());
        newEntity.setCreatedDate(oldEntity.getCreatedDate());
        newEntity.setUpdatedDate(LocalDateTime.now());
        return super.updateById(id, newEntity);
    }

    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Map<String, Object> response = super.findAllPaging(page, size);
        List<Product> products = (List<Product>) response.get("listOfItems");
        response.put("listOfItems", dtoMapper.toProductDTOs(products));
        return response;
    }
}
