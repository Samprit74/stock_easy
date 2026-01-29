package com.stockeasy.stockeasy.dto.response;

import java.time.LocalDate;

public record BatchItemResponseDto(
        Long batchItemId,
        String medicineName,
        String batchNumber,
        int quantityAvailable,
        LocalDate manufactureDate,
        LocalDate expiryDate,
        double buyPrice
) {
}
