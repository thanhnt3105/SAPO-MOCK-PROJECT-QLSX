package com.sapo.edu.service;

import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.service.base.BaseService;

import java.util.List;

public interface CustomerService extends BaseService<Customer> {
    public List<Motorbike> getAllMotorbikesByCustomersId(Long customerId);

    public void deleteMotorbikeFromCustomer(Long motorbikeId, Long customerId);

    public Motorbike addMotorbikeToCustomer(Long motorbikeId, Long customerId);
}
