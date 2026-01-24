package com.stockeasy.stockeasy.service;

import com.stockeasy.stockeasy.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomerService {

    Customer createOrGetCustomer(Customer customer);

    Customer getCustomerById(Long customerId);

    Page<Customer> getAllCustomers(Pageable pageable);

    Customer updateCustomer(Long customerId, Customer customer);

    void deleteCustomer(Long customerId);
}
