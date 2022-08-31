package com.sapo.edu.mapper.request;

import com.sapo.edu.common.RandomCodeGenerator;
import com.sapo.edu.entity.Category;
import com.sapo.edu.entity.Product;
import com.sapo.edu.payload.request.ProductRequest;
import com.sapo.edu.repository.ProductRepository;
import com.sapo.edu.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductRequestMapper {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;

    public Product toProduct(ProductRequest productRequest) {
        String code;
        Product product = new Product();
        Category category;
        do {
            code = RandomCodeGenerator.genCode("SP", 3, false, true);
        } while (productRepository.existsByCode(code));
        product.setCode(code);
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setQuantity(productRequest.getQuantity());
        product.setImage(productRequest.getImage());
        category = categoryService.findById(productRequest.getCategoryId());
        product.setCategory(category);
        return product;
    }
}
