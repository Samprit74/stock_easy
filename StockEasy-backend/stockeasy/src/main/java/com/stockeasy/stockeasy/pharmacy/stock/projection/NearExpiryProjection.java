package com.stockeasy.stockeasy.pharmacy.stock.projection;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Value;

public interface NearExpiryProjection {

    @Value("#{target.medicine.medicineName}")
    String getMedicineName();

    @Value("#{target.batch != null ? target.batch.batchNumber : null}")
    String getBatchNumber();

    LocalDate getExpiryDate();

    Integer getRemainingQuantity();
}
