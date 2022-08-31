package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class Category extends BaseEntity {
    @Column(name = "code", nullable = false, length = 20)
    private String code;
    @Column(name = "name", nullable = false, length = 50)
    private String name;
    @Column(name = "description", length = 1024)
    private String description;
    // One-to-Many relationship
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Product> products;

    public void addProduct(Product product) {
        this.products.add(product);
        product.setCategory(this);
    }

    public void removeProduct(Long productId) {
        Product product = this.products.stream().filter(p -> p.getId() == productId).findFirst().orElse(null);
        if (product != null) {
            this.products.remove(product);
            product.setCategory(null);
        }
    }
}