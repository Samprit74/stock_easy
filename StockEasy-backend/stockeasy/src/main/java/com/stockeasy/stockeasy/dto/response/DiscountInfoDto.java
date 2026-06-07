package com.stockeasy.stockeasy.dto.response;

public record DiscountInfoDto(
        int daysUntilExpiry,
        double discountPercent,
        double originalPrice,
        double finalPrice
) {
}
