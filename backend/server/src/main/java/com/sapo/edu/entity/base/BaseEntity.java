package com.sapo.edu.entity.base;

import lombok.Data;

import javax.persistence.*;

@MappedSuperclass
@Data
public abstract class BaseEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    protected Long id;
}