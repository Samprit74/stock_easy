package com.stockeasy.stockeasy.service.impl;

import com.stockeasy.stockeasy.entity.Customer;
import com.stockeasy.stockeasy.repository.CustomerRepository;
import com.stockeasy.stockeasy.service.CustomerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer createOrGetCustomer(Customer customer) {
        return customerRepository.findByPhone(customer.getPhone())
                .orElseGet(() -> customerRepository.save(customer));
    }

    @Override
    public Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    @Override
    public Page<Customer> getAllCustomers(Pageable pageable) {
        return customerRepository.findAll(pageable);
    }

    @Override
    public Customer updateCustomer(Long customerId, Customer customer) {
        Customer existing = getCustomerById(customerId);
        existing.setName(customer.getName());
        existing.setPhone(customer.getPhone());
        existing.setEmail(customer.getEmail());
        return customerRepository.save(existing);
    }

    @Override
    public void deleteCustomer(Long customerId) {
        customerRepository.deleteById(customerId);
    }
}
