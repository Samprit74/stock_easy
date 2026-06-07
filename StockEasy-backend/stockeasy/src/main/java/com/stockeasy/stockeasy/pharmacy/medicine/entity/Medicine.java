package com.stockeasy.stockeasy.pharmacy.medicine.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicineId;

    private String medicineName;
    private String brand;
    private String category;

    private Double defaultSellPrice;

    public Medicine() {}

    public Medicine(String medicineName, String brand, String category) {
        this.medicineName = medicineName;
        this.brand = brand;
        this.category = category;
    }

    public Long getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Long medicineId) {
        this.medicineId = medicineId;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getDefaultSellPrice() {
        return defaultSellPrice;
    }

    public void setDefaultSellPrice(Double defaultSellPrice) {
        this.defaultSellPrice = defaultSellPrice;
    }
}
