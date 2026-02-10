package com.stockeasy.stockeasy.dto.response;

public class DashboardResponseDto {

    private long totalMedicines;
    private long totalCustomers;
    private double totalRevenue;
    private long expiringSoon;
    private long expiredStock;

    public DashboardResponseDto() {
    }

    public DashboardResponseDto(long totalMedicines,
                                long totalCustomers,
                                double totalRevenue,
                                long expiringSoon,
                                long expiredStock) {
        this.totalMedicines = totalMedicines;
        this.totalCustomers = totalCustomers;
        this.totalRevenue = totalRevenue;
        this.expiringSoon = expiringSoon;
        this.expiredStock = expiredStock;
    }

    public long getTotalMedicines() {
        return totalMedicines;
    }

    public void setTotalMedicines(long totalMedicines) {
        this.totalMedicines = totalMedicines;
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public long getExpiringSoon() {
        return expiringSoon;
    }

    public void setExpiringSoon(long expiringSoon) {
        this.expiringSoon = expiringSoon;
    }

    public long getExpiredStock() {
        return expiredStock;
    }

    public void setExpiredStock(long expiredStock) {
        this.expiredStock = expiredStock;
    }
}
