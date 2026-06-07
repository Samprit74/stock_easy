package com.stockeasy.stockeasy.dto.response;

public record TopMedicineDto(
        String medicineName,
        long totalQuantity,
        double totalRevenue
) {
}
