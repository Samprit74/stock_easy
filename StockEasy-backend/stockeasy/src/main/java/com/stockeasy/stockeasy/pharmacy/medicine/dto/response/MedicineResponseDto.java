package com.stockeasy.stockeasy.pharmacy.medicine.dto.response;

import com.stockeasy.stockeasy.pharmacy.medicine.entity.Medicine;

public record MedicineResponseDto(
        Long medicineId,
        String medicineName,
        String brand,
        String category,
        Double defaultSellPrice
) {
    public static MedicineResponseDto from(Medicine m) {
        return new MedicineResponseDto(
                m.getMedicineId(),
                m.getMedicineName(),
                m.getBrand(),
                m.getCategory(),
                m.getDefaultSellPrice()
        );
    }
}
