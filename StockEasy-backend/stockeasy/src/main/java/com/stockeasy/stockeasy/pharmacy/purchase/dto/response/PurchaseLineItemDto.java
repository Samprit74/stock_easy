package com.stockeasy.stockeasy.pharmacy.purchase.dto.response;

import java.time.LocalDate;

public record PurchaseLineItemDto(
        Long batchItemId,
        Long medicineId,
        String medicineName,
        int quantity,
        LocalDate manufactureDate,
        LocalDate expiryDate,
        double buyPrice
) {
}
