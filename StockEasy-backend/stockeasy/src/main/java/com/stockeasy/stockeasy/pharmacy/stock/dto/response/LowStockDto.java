package com.stockeasy.stockeasy.pharmacy.stock.dto.response;

public record LowStockDto(
        Long medicineId,
        String medicineName,
        String brand,
        String category,
        int totalAvailable,
        int threshold
) {
}
