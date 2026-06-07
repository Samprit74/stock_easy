package com.stockeasy.stockeasy.pharmacy.stock.dto.response;

public class LowStockDto {

    private final Long medicineId;
    private final String medicineName;
    private final String brand;
    private final String category;
    private final int totalAvailable;
    private final int threshold;

    public LowStockDto(
            Long medicineId,
            String medicineName,
            String brand,
            String category,
            int totalAvailable,
            int threshold
    ) {
        this.medicineId = medicineId;
        this.medicineName = medicineName;
        this.brand = brand;
        this.category = category;
        this.totalAvailable = totalAvailable;
        this.threshold = threshold;
    }

    public Long getMedicineId() { return medicineId; }
    public String getMedicineName() { return medicineName; }
    public String getBrand() { return brand; }
    public String getCategory() { return category; }
    public int getTotalAvailable() { return totalAvailable; }
    public int getThreshold() { return threshold; }
}
