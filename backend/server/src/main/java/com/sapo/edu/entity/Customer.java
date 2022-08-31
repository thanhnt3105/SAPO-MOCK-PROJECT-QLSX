package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers")
public class Customer extends BaseEntity {
    @Column(name = "name", nullable = false, length = 50)
    private String name;
    @Column(name = "phone", nullable = false, length = 25)
    private String phone;
    @Column(name = "address", length = 100)
    private String address;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "motorbikes_customers", joinColumns = {@JoinColumn(name = "customer_id")}, inverseJoinColumns = {@JoinColumn(name = "motorbike_id")})
    private Set<Motorbike> motorbikes;

    public void addMotorbike(Motorbike motorbike) {
        this.motorbikes.add(motorbike);
        motorbike.getCustomers().add(this);
    }

    public void removeMotorbike(Long motorbikeId) {
        Motorbike motorbike = this.motorbikes.stream().filter(mtb -> mtb.getId() == motorbikeId).findFirst().orElse(null);
        if (motorbike != null) {
            this.motorbikes.remove(motorbike);
            motorbike.getCustomers().remove(this);
        }
    }
}