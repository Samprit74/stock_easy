package com.stockeasy.stockeasy.util;

import com.stockeasy.stockeasy.dto.response.DiscountInfoDto;

import java.time.LocalDate;

public final class DiscountCalculator {

    private DiscountCalculator() {}

    public static double percentFor(int daysUntilExpiry) {
        if (daysUntilExpiry <= 0) return 0.0;
        if (daysUntilExpiry <= 7)  return 20.0;
        if (daysUntilExpiry <= 15) return 10.0;
        if (daysUntilExpiry <= 30) return 5.0;
        return 0.0;
    }

    public static DiscountInfoDto evaluate(LocalDate expiryDate, double originalPrice) {
        int days = (int) (expiryDate.toEpochDay() - LocalDate.now().toEpochDay());
        double pct = percentFor(days);
        double finalPrice = round2(originalPrice * (1.0 - pct / 100.0));
        return new DiscountInfoDto(days, pct, originalPrice, finalPrice);
    }

    public static double apply(LocalDate expiryDate, double originalPrice) {
        return evaluate(expiryDate, originalPrice).finalPrice();
    }

    private static double round2(double v) {
        return Math.round(v * 100.0) / 100.0;
    }
}
