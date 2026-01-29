package com.stockeasy.stockeasy.projection;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Value;

public interface NearExpiryProjection {

    @Value("#{target.medicine.medicineName}")
    String getMedicineName();

    String getBatchNumber();

    LocalDate getExpiryDate();

    Integer getRemainingQuantity();
}
