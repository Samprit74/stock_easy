package com.stockeasy.stockeasy.pharmacy.stock.dto.response;

import java.time.LocalDate;

public class StockResponseDto {

    private String medicineName;
    private int quantityAvailable;
    private LocalDate manufactureDate;
    private LocalDate expiryDate;
    private double buyPrice;

    public StockResponseDto() {
    }

    public StockResponseDto(String medicineName,
                            int quantityAvailable,
                            LocalDate manufactureDate,
                            LocalDate expiryDate,
                            double buyPrice) {
        this.medicineName = medicineName;
        this.quantityAvailable = quantityAvailable;
        this.manufactureDate = manufactureDate;
        this.expiryDate = expiryDate;
        this.buyPrice = buyPrice;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public int getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(int quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    public LocalDate getManufactureDate() {
        return manufactureDate;
    }

    public void setManufactureDate(LocalDate manufactureDate) {
        this.manufactureDate = manufactureDate;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public double getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(double buyPrice) {
        this.buyPrice = buyPrice;
    }
}
