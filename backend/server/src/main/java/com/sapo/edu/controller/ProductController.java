package com.sapo.edu.controller;

import com.sapo.edu.controller.base.BaseController;
import com.sapo.edu.mapper.dto.ProductDTOMapper;
import com.sapo.edu.mapper.request.ProductRequestMapper;
import com.sapo.edu.payload.request.ProductRequest;
import com.sapo.edu.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/products")
public class ProductController implements BaseController<ProductRequest> {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRequestMapper requestMapper;
    @Autowired
    private ProductDTOMapper dtoMapper;

    @Override
    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> all() {
        return ResponseEntity.ok(dtoMapper.toProductDTOs(productService.findAll()));
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> one(Long id) {
        return ResponseEntity.ok().body(dtoMapper.toProductDTO(productService.findById(id)));
    }

    @Override
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> create(@Valid @RequestBody ProductRequest entity) {
        return ResponseEntity.ok(dtoMapper.toProductDTO(productService.save(requestMapper.toProduct(entity))));
    }

    @Override
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(ProductRequest entity, Long id) {
        return ResponseEntity.ok().body(dtoMapper.toProductDTO(productService.updateById(id, requestMapper.toProduct(entity))));
    }

    @Override
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(Long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/paging")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MODERATOR')")
    public ResponseEntity<?> all(int page, int size) {
        return ResponseEntity.ok().body(productService.findAllPaging(page, size));
    }
}
