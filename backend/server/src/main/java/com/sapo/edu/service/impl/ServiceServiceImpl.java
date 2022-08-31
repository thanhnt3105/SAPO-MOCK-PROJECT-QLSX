package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Service;
import com.sapo.edu.mapper.dto.ServiceDTOMapper;
import com.sapo.edu.repository.ServiceRepository;
import com.sapo.edu.service.ServiceService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Service
public class ServiceServiceImpl extends BaseServiceImpl<Service> implements ServiceService {
    @Autowired
    private ServiceDTOMapper dtoMapper;

    protected ServiceServiceImpl(ServiceRepository serviceRepository) {
        super(serviceRepository);
    }

    @Override
    public Service save(Service entity) {
        entity.setCreatedDate(Instant.now());
        return super.save(entity);
    }

    @Override
    public Service updateById(Long id, Service newEntity) {
        Service oldEntity = this.findById(id);
        // these fields cannot update
        newEntity.setId(oldEntity.getId());
        newEntity.setCode(oldEntity.getCode());
        newEntity.setCreatedDate(oldEntity.getCreatedDate());
        newEntity.setUpdatedDate(Instant.now());
        return super.updateById(id, newEntity);
    }

    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Map<String, Object> response = super.findAllPaging(page, size);
        List<Service> services = (List<Service>) response.get("listOfItems");
        response.put("listOfItems", dtoMapper.toServiceDTOs(services));
        return response;
    }
}
