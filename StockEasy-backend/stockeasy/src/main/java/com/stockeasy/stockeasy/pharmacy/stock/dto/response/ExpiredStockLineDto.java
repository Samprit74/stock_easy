package com.stockeasy.stockeasy.pharmacy.stock.dto.response;

import java.time.LocalDate;

public record ExpiredStockLineDto(
        String medicineName,
        String brand,
        String category,
        String batchNumber,
        LocalDate expiryDate,
        int quantityExpired,
        double buyPrice,
        double totalLoss
) {
}
