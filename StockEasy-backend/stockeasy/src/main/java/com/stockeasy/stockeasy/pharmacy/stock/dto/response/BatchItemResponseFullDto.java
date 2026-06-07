package com.stockeasy.stockeasy.pharmacy.stock.dto.response;

import com.stockeasy.stockeasy.pharmacy.stock.entity.BatchItem;

import java.time.LocalDate;

public record BatchItemResponseFullDto(
        Long batchItemId,
        Long medicineId,
        String medicineName,
        String brand,
        String category,
        int quantityAvailable,
        LocalDate manufactureDate,
        LocalDate expiryDate,
        double buyPrice,
        Long batchId,
        String batchNumber
) {
    public static BatchItemResponseFullDto from(BatchItem b) {
        return new BatchItemResponseFullDto(
                b.getBatchItemId(),
                b.getMedicine() != null ? b.getMedicine().getMedicineId() : null,
                b.getMedicine() != null ? b.getMedicine().getMedicineName() : null,
                b.getMedicine() != null ? b.getMedicine().getBrand() : null,
                b.getMedicine() != null ? b.getMedicine().getCategory() : null,
                b.getQuantityAvailable(),
                b.getManufactureDate(),
                b.getExpiryDate(),
                b.getBuyPrice(),
                b.getBatch() != null ? b.getBatch().getBatchId() : null,
                b.getBatch() != null ? b.getBatch().getBatchNumber() : null
        );
    }
}
