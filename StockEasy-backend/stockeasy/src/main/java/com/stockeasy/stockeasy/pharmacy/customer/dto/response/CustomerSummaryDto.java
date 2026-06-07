package com.stockeasy.stockeasy.pharmacy.customer.dto.response;

public record CustomerSummaryDto(
        Long customerId,
        String name,
        String phone,
        String email,
        int totalOrders,
        int regularThreshold,
        boolean regular
) {
}
