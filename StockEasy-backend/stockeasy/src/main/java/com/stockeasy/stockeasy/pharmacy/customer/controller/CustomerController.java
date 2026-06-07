package com.stockeasy.stockeasy.pharmacy.customer.controller;

import com.stockeasy.stockeasy.pharmacy.customer.dto.request.CustomerRequestDto;
import com.stockeasy.stockeasy.pharmacy.customer.dto.response.CustomerResponseDto;
import com.stockeasy.stockeasy.pharmacy.customer.entity.Customer;
import com.stockeasy.stockeasy.pharmacy.customer.repository.CustomerRepository;
import com.stockeasy.stockeasy.pharmacy.customer.service.CustomerService;
import com.stockeasy.stockeasy.shared.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
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
    public CustomerResponseDto createCustomer(@Valid @RequestBody CustomerRequestDto dto) {
        Customer customer = new Customer(
                dto.getName(),
                dto.getPhone(),
                dto.getEmail()
        );
        return CustomerResponseDto.from(customerService.createOrGetCustomer(customer));
    }

    @GetMapping
    public Page<CustomerResponseDto> getAllCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return customerService.getAllCustomers(PageRequest.of(page, size))
                .map(CustomerResponseDto::from);
    }

    @GetMapping("/{id}")
    public CustomerResponseDto getCustomerById(@PathVariable Long id) {
        return CustomerResponseDto.from(customerService.getCustomerById(id));
    }

    @GetMapping("/by-phone/{phone}")
    public CustomerResponseDto getByPhone(@PathVariable String phone) {
        Customer customer = customerRepository.findByPhone(phone)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Customer not found: " + phone));
        return CustomerResponseDto.from(customer);
    }

    @GetMapping("/search")
    public java.util.List<CustomerResponseDto> search(@RequestParam String q) {
        return customerRepository.findByNameContainingIgnoreCase(q).stream()
                .map(CustomerResponseDto::from)
                .toList();
    }

    @PutMapping("/{id}")
    public CustomerResponseDto updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequestDto dto
    ) {
        Customer customer = new Customer(
                dto.getName(),
                dto.getPhone(),
                dto.getEmail()
        );
        return CustomerResponseDto.from(customerService.updateCustomer(id, customer));
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
}
