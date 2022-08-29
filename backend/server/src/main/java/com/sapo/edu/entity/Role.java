package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "roles")
@NoArgsConstructor
// @EntityListeners(AuditingEntityListener.class) // needed if some field of object not in database
public class Role extends BaseEntity {
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;


    @ManyToMany(mappedBy = "roles") // roles is the name of set in Employee class
    private Set<Employee> employees;

    public Role(ERole name) {
        this.name = name;
    }
    public ERole getName() {
        return name;
    }
    public void setName(ERole name) {
        this.name = name;
    }
}