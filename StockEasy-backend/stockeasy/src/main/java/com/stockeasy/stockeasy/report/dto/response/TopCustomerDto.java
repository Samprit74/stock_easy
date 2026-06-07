package com.stockeasy.stockeasy.report.dto.response;

public record TopCustomerDto(
        Long customerId,
        String customerName,
        String phone,
        long orderCount,
        double totalSpent
) {
}
