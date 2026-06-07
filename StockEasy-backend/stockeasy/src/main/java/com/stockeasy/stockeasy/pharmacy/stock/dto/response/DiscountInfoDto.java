package com.stockeasy.stockeasy.pharmacy.stock.dto.response;

public record DiscountInfoDto(
        int daysUntilExpiry,
        double discountPercent,
        double originalPrice,
        double finalPrice
) {
}
