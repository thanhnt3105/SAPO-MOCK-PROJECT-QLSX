package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "models")
public class Model extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;
    @Column(name = "model_name", nullable = false, length = 50)
    private String modelName;
    // One-to-Many Relationship
    @OneToMany(mappedBy = "model", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Motorbike> motorbikes;
    // Many-to-Many relationship
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "products_models", joinColumns = {@JoinColumn(name = "model_id")}, inverseJoinColumns = {@JoinColumn(name = "product_id")})
    private Set<Product> products;

    public void addMotorbike(Motorbike motorbike) {
        this.motorbikes.add(motorbike);
        motorbike.setModel(this);
    }

    public void removeMotorbike(Long motorbikeId) {
        Motorbike motorbike = this.motorbikes.stream().filter(m -> m.getId() == motorbikeId).findFirst().orElse(null);
        if (motorbike != null) {
            this.motorbikes.remove(motorbike);
            motorbike.setModel(null);
        }
    }

    public void addProduct(Product product) {
        this.products.add(product);
        product.getModels().add(this);
    }

    public void removeProduct(Long productId) {
        Product product = this.products.stream().filter(p -> p.getId() == productId).findFirst().orElse(null);
        if (product != null) {
            this.products.remove(product);
            product.getModels().remove(this);
        }
    }
}
