package com.stockeasy.stockeasy.dto.request;

import java.util.List;

public class SaleRequestDto {

    private CustomerRequestDto customer;
    private List<SaleItemDto> items;
    private double totalAmount;

    public SaleRequestDto() {
    }

    public SaleRequestDto(CustomerRequestDto customer,
                          List<SaleItemDto> items,
                          double totalAmount) {
        this.customer = customer;
        this.items = items;
        this.totalAmount = totalAmount;
    }

    public CustomerRequestDto getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerRequestDto customer) {
        this.customer = customer;
    }

    public List<SaleItemDto> getItems() {
        return items;
    }

    public void setItems(List<SaleItemDto> items) {
        this.items = items;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
