package com.sapo.edu.controller;

import com.sapo.edu.controller.base.BaseController;
import com.sapo.edu.mapper.dto.ServiceDTOMapper;
import com.sapo.edu.mapper.request.ServiceRequestMapper;
import com.sapo.edu.payload.request.ServiceRequest;
import com.sapo.edu.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/services")
public class ServiceController implements BaseController<ServiceRequest> {
    @Autowired
    private ServiceService serviceService;
    @Autowired
    private ServiceDTOMapper dtoMapper;
    @Autowired
    private ServiceRequestMapper requestMapper;

    @Override
    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> all() {
        return ResponseEntity.ok().body(dtoMapper.toServiceDTOs(serviceService.findAll()));
    }

    @Override
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> one(Long id) {
        return ResponseEntity.ok().body(dtoMapper.toServiceDTO(serviceService.findById(id)));
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> create(ServiceRequest entity) {
        return ResponseEntity.ok().body(dtoMapper.toServiceDTO(serviceService.save(requestMapper.toService(entity))));
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(ServiceRequest entity, Long id) {
        return ResponseEntity.ok().body(dtoMapper.toServiceDTO(serviceService.updateById(id, requestMapper.toService(entity))));
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Long id) {
        serviceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/paging")
    public ResponseEntity<?> all(int page, int size) {
        return ResponseEntity.ok().body(serviceService.findAllPaging(page, size));
    }
}
