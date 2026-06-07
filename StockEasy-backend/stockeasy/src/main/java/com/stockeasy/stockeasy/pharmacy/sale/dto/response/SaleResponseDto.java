package com.stockeasy.stockeasy.pharmacy.sale.dto.response;

import java.time.LocalDate;
import java.util.List;

public class SaleResponseDto {

    private Long saleId;
    private String customerName;
    private String customerPhone;
    private LocalDate saleDate;
    private double totalAmount;
    private boolean returned;
    private List<SaleItemResponseDto> items;

    public SaleResponseDto() {}

    public SaleResponseDto(Long saleId,
                           String customerName,
                           String customerPhone,
                           LocalDate saleDate,
                           double totalAmount,
                           List<SaleItemResponseDto> items) {
        this.saleId = saleId;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.saleDate = saleDate;
        this.totalAmount = totalAmount;
        this.items = items;
    }

    public Long getSaleId() { return saleId; }
    public void setSaleId(Long saleId) { this.saleId = saleId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public LocalDate getSaleDate() { return saleDate; }
    public void setSaleDate(LocalDate saleDate) { this.saleDate = saleDate; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public boolean isReturned() { return returned; }
    public void setReturned(boolean returned) { this.returned = returned; }

    public List<SaleItemResponseDto> getItems() { return items; }
    public void setItems(List<SaleItemResponseDto> items) { this.items = items; }
}
