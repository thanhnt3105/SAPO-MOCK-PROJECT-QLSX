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
@Table(name = "brands")
public class Brand extends BaseEntity {
    @Column(name = "brand_name", nullable = false, length = 50)
    private String brandName;
    // One-To-Many relationship
    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Model> models;

    public void addModel(Model model) {
        this.models.add(model);
        model.setBrand(this);
    }

    public void removeModel(Long modelId) {
        Model model = this.models.stream().filter(m -> m.getId() == modelId).findFirst().orElse(null);
        if (model != null) {
            this.models.remove(model);
            model.setBrand(null);
        }
    }
}
