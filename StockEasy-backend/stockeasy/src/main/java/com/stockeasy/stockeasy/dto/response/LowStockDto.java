package com.stockeasy.stockeasy.dto.response;

public record LowStockDto(
        Long medicineId,
        String medicineName,
        String brand,
        String category,
        int totalAvailable,
        int threshold
) {
}
