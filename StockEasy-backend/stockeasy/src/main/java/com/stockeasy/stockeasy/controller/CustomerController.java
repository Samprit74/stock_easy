package com.stockeasy.stockeasy.controller;

import com.stockeasy.stockeasy.dto.request.CustomerRequestDto;
import com.stockeasy.stockeasy.entity.Customer;
import com.stockeasy.stockeasy.repository.CustomerRepository;
import com.stockeasy.stockeasy.service.CustomerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    public CustomerController(CustomerService customerService,
                              CustomerRepository customerRepository) {
        this.customerService = customerService;
        this.customerRepository = customerRepository;
    }

    // CREATE or GET existing customer by phone
    @PostMapping
    public Customer createCustomer(@RequestBody CustomerRequestDto dto) {
        Customer customer = new Customer(
                dto.getName(),
                dto.getPhone(),
                dto.getEmail()
        );
        return customerService.createOrGetCustomer(customer);
    }

    // GET customers with pagination
    // example: /api/customers?page=0&size=5
    @GetMapping
    public Page<Customer> getAllCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return customerService.getAllCustomers(PageRequest.of(page, size));
    }

    // GET customer by ID
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    // GET customer summary by phone (used to detect regular customers at sale time)
    @GetMapping("/by-phone/{phone}")
    public com.stockeasy.stockeasy.dto.response.CustomerSummaryDto getByPhone(
            @PathVariable String phone
    ) {
        Customer customer = customerRepository.findByPhone(phone)
                .orElseThrow(() -> new com.stockeasy.stockeasy.exception.ResourceNotFoundException(
                        "Customer not found: " + phone));
        return new com.stockeasy.stockeasy.dto.response.CustomerSummaryDto(
                customer.getCustomerId(),
                customer.getName(),
                customer.getPhone(),
                customer.getEmail(),
                customer.getTotalOrders(),
                customer.getRegularThreshold(),
                customer.isRegular()
        );
    }

    // UPDATE customer
    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Long id,
            @RequestBody CustomerRequestDto dto
    ) {
        Customer customer = new Customer(
                dto.getName(),
                dto.getPhone(),
                dto.getEmail()
        );
        return customerService.updateCustomer(id, customer);
    }

    // DELETE customer
    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
}
