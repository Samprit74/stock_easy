package com.stockeasy.stockeasy.pharmacy.purchase.dto.mapper;

import com.stockeasy.stockeasy.pharmacy.purchase.dto.response.PurchaseLineItemDto;
import com.stockeasy.stockeasy.pharmacy.purchase.dto.response.PurchaseResponseDto;
import com.stockeasy.stockeasy.pharmacy.stock.entity.BatchItem;
import com.stockeasy.stockeasy.pharmacy.stock.entity.PurchaseBatch;

import java.util.List;

public final class PurchaseMapper {

    private PurchaseMapper() {}

    public static PurchaseResponseDto toDto(PurchaseBatch b, List<BatchItem> items) {
        return new PurchaseResponseDto(
                b.getBatchId(),
                b.getBatchNumber(),
                b.getInvoiceNo(),
                b.getPurchaseDate(),
                b.getSupplier() != null ? b.getSupplier().getSupplierId() : null,
                b.getSupplier() != null ? b.getSupplier().getName() : null,
                items.stream().map(PurchaseMapper::toLineItem).toList()
        );
    }

    public static PurchaseResponseDto toDto(PurchaseBatch b) {
        return toDto(b, List.of());
    }

    public static PurchaseLineItemDto toLineItem(BatchItem bi) {
        return new PurchaseLineItemDto(
                bi.getBatchItemId(),
                bi.getMedicine() != null ? bi.getMedicine().getMedicineId() : null,
                bi.getMedicine() != null ? bi.getMedicine().getMedicineName() : null,
                bi.getQuantityAvailable(),
                bi.getManufactureDate(),
                bi.getExpiryDate(),
                bi.getBuyPrice()
        );
    }
}
