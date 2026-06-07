package com.stockeasy.stockeasy.pharmacy.sale.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class SaleItemDto {

    @NotNull
    private Long medicineId;

    @Positive
    private int quantity;

    @PositiveOrZero
    private double sellPrice;

    public SaleItemDto() {}

    public SaleItemDto(Long medicineId, int quantity, double sellPrice) {
        this.medicineId = medicineId;
        this.quantity = quantity;
        this.sellPrice = sellPrice;
    }

    public Long getMedicineId() { return medicineId; }
    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getSellPrice() { return sellPrice; }
    public void setSellPrice(double sellPrice) { this.sellPrice = sellPrice; }
}
