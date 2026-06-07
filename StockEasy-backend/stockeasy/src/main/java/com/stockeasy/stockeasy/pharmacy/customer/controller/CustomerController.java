package com.stockeasy.stockeasy.pharmacy.customer.controller;

import com.stockeasy.stockeasy.pharmacy.customer.dto.request.CustomerRequestDto;
import com.stockeasy.stockeasy.pharmacy.customer.dto.response.CustomerSummaryDto;
import com.stockeasy.stockeasy.pharmacy.customer.entity.Customer;
import com.stockeasy.stockeasy.pharmacy.customer.repository.CustomerRepository;
import com.stockeasy.stockeasy.pharmacy.customer.service.CustomerService;
import com.stockeasy.stockeasy.shared.exception.ResourceNotFoundException;
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

    @PostMapping
    public Customer createCustomer(@RequestBody CustomerRequestDto dto) {
        Customer customer = new Customer(
                dto.getName(),
                dto.getPhone(),
                dto.getEmail()
        );
        return customerService.createOrGetCustomer(customer);
    }

    @GetMapping
    public Page<Customer> getAllCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return customerService.getAllCustomers(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @GetMapping("/by-phone/{phone}")
    public CustomerSummaryDto getByPhone(@PathVariable String phone) {
        Customer customer = customerRepository.findByPhone(phone)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Customer not found: " + phone));
        return new CustomerSummaryDto(
                customer.getCustomerId(),
                customer.getName(),
                customer.getPhone(),
                customer.getEmail(),
                customer.getTotalOrders(),
                customer.getRegularThreshold(),
                customer.isRegular()
        );
    }

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

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
}
