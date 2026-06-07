package com.stockeasy.stockeasy.pharmacy.stock.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stockeasy.stockeasy.pharmacy.medicine.entity.Medicine;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "batch_items")
public class BatchItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long batchItemId;

    @ManyToOne
    @JoinColumn(name = "batch_id", nullable = false)
    @JsonIgnore
    private PurchaseBatch batch;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    private int quantityAvailable;
    private LocalDate manufactureDate;
    private LocalDate expiryDate;
    private double buyPrice;

    public BatchItem() {
    }

    public BatchItem(
            PurchaseBatch batch,
            Medicine medicine,
            int quantityAvailable,
            LocalDate manufactureDate,
            LocalDate expiryDate,
            double buyPrice
    ) {
        this.batch = batch;
        this.medicine = medicine;
        this.quantityAvailable = quantityAvailable;
        this.manufactureDate = manufactureDate;
        this.expiryDate = expiryDate;
        this.buyPrice = buyPrice;
    }

    public Long getBatchItemId() {
        return batchItemId;
    }

    public void setBatchItemId(Long batchItemId) {
        this.batchItemId = batchItemId;
    }

    public PurchaseBatch getBatch() {
        return batch;
    }

    public void setBatch(PurchaseBatch batch) {
        this.batch = batch;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
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
