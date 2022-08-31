package com.sapo.edu.entity;

import com.sapo.edu.common.ERole;
import com.sapo.edu.entity.base.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@Data
public class Role extends BaseEntity {
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;
    @ManyToMany(mappedBy = "roles") // roles is the name of set in Employee class
    private Set<Employee> employees;

    public Role(ERole name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        return super.equals(o);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public String toString() {
        return "Role{" + "name=" + name + ", employees=" + "none (avoid recursion)" + ", id=" + id + '}';
    }
}