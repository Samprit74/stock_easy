package com.stockeasy.stockeasy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stockeasy.stockeasy.user.entity.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "sales")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long saleId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    /**
     * The staff/admin user who created this sale. Nullable so legacy
     * rows / tests aren't broken, but every new sale MUST set this.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id")
    @JsonIgnore
    private User createdBy;

    private LocalDate saleDate;
    private double totalAmount;

    public Sale() {}

    public Sale(Customer customer, LocalDate saleDate, double totalAmount) {
        this.customer = customer;
        this.saleDate = saleDate;
        this.totalAmount = totalAmount;
    }

    public Long getSaleId() {
        return saleId;
    }

    public void setSaleId(Long saleId) {
        this.saleId = saleId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(LocalDate saleDate) {
        this.saleDate = saleDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
