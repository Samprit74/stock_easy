package com.stockeasy.stockeasy.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    private String name;
    private String phone;
    private String email;

    @Column(nullable = false)
    private int totalOrders;

    @Column(nullable = false)
    private int regularThreshold = 5;

    public Customer() {}

    public Customer(String name, String phone, String email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(int totalOrders) {
        this.totalOrders = totalOrders;
    }

    public int getRegularThreshold() {
        return regularThreshold;
    }

    public void setRegularThreshold(int regularThreshold) {
        this.regularThreshold = regularThreshold;
    }

    @Transient
    public boolean isRegular() {
        return totalOrders >= regularThreshold;
    }
}
