package com.sapo.edu.repository.base;

import com.sapo.edu.entity.base.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

//@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity, Long> extends JpaRepository<T, Long> {
}
