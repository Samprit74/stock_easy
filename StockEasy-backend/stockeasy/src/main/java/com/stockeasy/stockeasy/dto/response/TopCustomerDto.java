package com.stockeasy.stockeasy.dto.response;

public record TopCustomerDto(
        Long customerId,
        String customerName,
        String phone,
        long orderCount,
        double totalSpent
) {
}
