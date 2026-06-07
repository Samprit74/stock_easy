package com.stockeasy.stockeasy.pharmacy.customer.dto.response;

import com.stockeasy.stockeasy.pharmacy.customer.entity.Customer;

public record CustomerResponseDto(
        Long customerId,
        String name,
        String phone,
        String email,
        int totalOrders,
        int regularThreshold,
        boolean regular
) {
    public static CustomerResponseDto from(Customer c) {
        return new CustomerResponseDto(
                c.getCustomerId(),
                c.getName(),
                c.getPhone(),
                c.getEmail(),
                c.getTotalOrders(),
                c.getRegularThreshold(),
                c.isRegular()
        );
    }
}
