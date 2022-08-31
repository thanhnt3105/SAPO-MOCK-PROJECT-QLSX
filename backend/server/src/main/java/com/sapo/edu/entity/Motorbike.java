package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "motorbikes")
public class Motorbike extends BaseEntity {
    @Column(name = "license_plates", nullable = false, length = 20)
    private String licensePlates;
    @ManyToOne // Model is parent, Motorbike is child
    @JoinColumn(name = "model_id", nullable = false)
    private Model model;
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "motorbikes")
    private Set<Customer> customers = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        return super.equals(o);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
