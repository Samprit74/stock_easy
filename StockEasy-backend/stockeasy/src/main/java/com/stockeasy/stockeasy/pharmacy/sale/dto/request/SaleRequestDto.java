package com.stockeasy.stockeasy.pharmacy.sale.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.List;

public class SaleRequestDto {

    @NotNull
    @Valid
    private CustomerPayload customer;

    @PositiveOrZero
    private double totalAmount;

    @NotEmpty
    @Valid
    private List<SaleItemDto> items;

    public SaleRequestDto() {}

    public SaleRequestDto(CustomerPayload customer,
                          double totalAmount,
                          List<SaleItemDto> items) {
        this.customer = customer;
        this.totalAmount = totalAmount;
        this.items = items;
    }

    public CustomerPayload getCustomer() { return customer; }
    public void setCustomer(CustomerPayload customer) { this.customer = customer; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public List<SaleItemDto> getItems() { return items; }
    public void setItems(List<SaleItemDto> items) { this.items = items; }

    public static class CustomerPayload {

        @NotNull
        private String name;

        @NotNull
        private String phone;

        private String email;

        public CustomerPayload() {}

        public CustomerPayload(String name, String phone, String email) {
            this.name = name;
            this.phone = phone;
            this.email = email;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
}
