package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.exception.DuplicateEntityException;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.mapper.dto.CustomerDTOMapper;
import com.sapo.edu.payload.request.CustomerRequest;
import com.sapo.edu.repository.CustomerRepository;
import com.sapo.edu.repository.MotorbikeRepository;
import com.sapo.edu.service.CustomerService;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class CustomerServiceImpl extends BaseServiceImpl<Customer> implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CustomerDTOMapper dtoMapper;
    @Autowired
    private MotorbikeRepository motorbikeRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        super(customerRepository);
    }

    @Override
    @Transactional
    public Customer save(Customer newEntity) {
        if (customerRepository.existsByPhone(newEntity.getPhone()))
            throw new DuplicateEntityException(CustomerRequest.class, "phone", newEntity.getPhone());
        newEntity.setCreatedDate(LocalDateTime.now());
        return super.save(newEntity);
    }

    @Override
    @Transactional
    public Customer updateById(Long id, Customer newEntity) {
        Customer oldEntity = this.findById(id);
        // this field cannot update
        newEntity.setId(oldEntity.getId());
        newEntity.setCreatedDate(oldEntity.getCreatedDate());
        newEntity.setUpdatedDate(oldEntity.getUpdatedDate());
        if (customerRepository.existsByPhone(newEntity.getPhone())) {
            Customer existed = customerRepository.findByPhone(newEntity.getPhone()).get();
            if (!existed.getId().equals(newEntity.getId()))
                throw new DuplicateEntityException(CustomerRequest.class, "phone", newEntity.getPhone());
        }
        newEntity.setUpdatedDate(LocalDateTime.now());
        return super.updateById(id, newEntity);
    }

    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Map<String, Object> response = super.findAllPaging(page, size);
        List<Customer> customers = (List<Customer>) response.get("listOfItems");
        response.put("listOfItems", dtoMapper.toCustomerDTOs(customers));
        return response;
    }

    // Many-to-Many relationship
    @Override
    public List<Motorbike> getAllMotorbikesByCustomersId(Long customerId) {
        if (!customerRepository.existsById(customerId))
            throw new EntityNotFoundException(Customer.class, "customerId", customerId.toString());
        List<Motorbike> motorbikes = motorbikeRepository.findMotorbikesByCustomersId(customerId);
        return motorbikes;
    }

    @Override
    @Transactional
    public void deleteMotorbikeFromCustomer(Long motorbikeId, Long customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new EntityNotFoundException(Customer.class, "customerId", customerId.toString()));
        if (!motorbikeRepository.existsById(motorbikeId))
            throw new EntityNotFoundException(Motorbike.class, "motorbikeId", motorbikeId.toString());
        customer.removeMotorbike(motorbikeId);
        customerRepository.save(customer);
    }

    @Override
    @Transactional
    public Motorbike addMotorbikeToCustomer(Long motorbikeId, Long customerId) {
        Motorbike motorbike = customerRepository.findById(customerId).map(customer -> {
            Motorbike _motorbike = motorbikeRepository.findById(motorbikeId).orElseThrow(() -> new EntityNotFoundException(Motorbike.class, "motorbikeId", motorbikeId.toString()));
            customer.addMotorbike(_motorbike);
            customerRepository.save(customer);
            return _motorbike;
        }).orElseThrow(() -> new EntityNotFoundException(Customer.class, "customerId", customerId.toString()));
        return motorbike;
    }
}
