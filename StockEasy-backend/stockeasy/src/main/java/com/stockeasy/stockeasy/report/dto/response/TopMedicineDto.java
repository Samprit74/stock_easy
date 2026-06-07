package com.stockeasy.stockeasy.report.dto.response;

public record TopMedicineDto(
        String medicineName,
        long totalQuantity,
        double totalRevenue
) {
}
