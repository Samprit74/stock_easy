package com.stockeasy.stockeasy.pharmacy.customer.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class CustomerRequestDto {

    @NotBlank
    private String name;

    @NotBlank
    @Pattern(regexp = "^[0-9+\\-\\s()]{7,20}$", message = "Invalid phone number")
    private String phone;

    private String email;

    public CustomerRequestDto() {}

    public CustomerRequestDto(String name, String phone, String email) {
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
