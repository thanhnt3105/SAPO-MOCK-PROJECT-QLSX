package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import com.sapo.edu.entity.connectentity.TicketProduct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product extends BaseEntity {
    @Column(name = "code", nullable = false, length = 20)
    private String code;
    @Column(name = "name", nullable = false, length = 50)
    private String name;
    @Column(name = "description", length = 1024)
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    @Column(name = "price", nullable = false, precision = 10)
    private BigDecimal price;
    @Column(name = "quantity", nullable = false)
    private Integer quantity;
    @Column(name = "image", length = 512)
    private String image;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "products")
    private Set<Model> models = new HashSet<>();
    @OneToMany(mappedBy = "product")
    private Set<TicketProduct> ticketProducts = new HashSet<>();
}
