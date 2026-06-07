package com.stockeasy.stockeasy.pharmacy.purchase.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDate;

public class PurchaseItemDto {

    @NotNull
    private Long medicineId;

    @Positive
    private int quantity;

    private LocalDate manufactureDate;

    @NotNull
    private LocalDate expiryDate;

    @PositiveOrZero
    private double buyPrice;

    public PurchaseItemDto() {}

    public PurchaseItemDto(Long medicineId, int quantity,
                           LocalDate manufactureDate,
                           LocalDate expiryDate,
                           double buyPrice) {
        this.medicineId = medicineId;
        this.quantity = quantity;
        this.manufactureDate = manufactureDate;
        this.expiryDate = expiryDate;
        this.buyPrice = buyPrice;
    }

    public Long getMedicineId() { return medicineId; }
    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public LocalDate getManufactureDate() { return manufactureDate; }
    public void setManufactureDate(LocalDate manufactureDate) { this.manufactureDate = manufactureDate; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public double getBuyPrice() { return buyPrice; }
    public void setBuyPrice(double buyPrice) { this.buyPrice = buyPrice; }
}
