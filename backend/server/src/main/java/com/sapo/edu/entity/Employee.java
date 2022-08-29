package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee extends BaseEntity {

    @Column(name = "code", unique = true, nullable = false)
    private String code;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "phone")
    private String phone;
    @Column(name = "address")
    private String address;
    @Column(name = "working_status")
    private Boolean workingStatus = true;
    @Column(name = "available")
    private Boolean available = true;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @Size(max = 20)
    @Column(name = "username")
    private String username;

    @Size(max = 120)
    @Column(name = "password")
    private String password; // after hashing

    // With this relationship @ManyToMany => when delete employee, all roles of that employee has been deleted before
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "employees_roles",
            joinColumns = {@JoinColumn(name = "employee_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private Set<Role> roles = new HashSet<>();
}
