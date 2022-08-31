package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import com.sapo.edu.entity.connectentity.TicketService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "services")
public class Service extends BaseEntity {
    @Column(name = "code", nullable = false, length = 20)
    private String code;
    @Column(name = "name", nullable = false, length = 50)
    private String name;
    @Column(name = "price", nullable = false, precision = 10)
    private BigDecimal price;
    @Column(name = "created_date")
    private Instant createdDate;
    @Column(name = "updated_date")
    private Instant updatedDate;
    @OneToMany(mappedBy = "service")
    private Set<TicketService> ticketServices = new HashSet<>();
}