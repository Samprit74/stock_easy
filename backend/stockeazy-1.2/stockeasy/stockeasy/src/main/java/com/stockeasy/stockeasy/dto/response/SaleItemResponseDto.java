package com.stockeasy.stockeasy.dto.response;

public class SaleItemResponseDto {

    private String medicineName;
    private int quantity;
    private double sellPrice;

    public SaleItemResponseDto() {
    }

    public SaleItemResponseDto(String medicineName, int quantity, double sellPrice) {
        this.medicineName = medicineName;
        this.quantity = quantity;
        this.sellPrice = sellPrice;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(double sellPrice) {
        this.sellPrice = sellPrice;
    }
}
