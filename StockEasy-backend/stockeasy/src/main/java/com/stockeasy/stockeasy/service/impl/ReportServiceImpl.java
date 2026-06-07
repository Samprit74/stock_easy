package com.stockeasy.stockeasy.service.impl;

import com.stockeasy.stockeasy.dto.response.DailyRevenueDto;
import com.stockeasy.stockeasy.dto.response.TopCustomerDto;
import com.stockeasy.stockeasy.dto.response.TopMedicineDto;
import com.stockeasy.stockeasy.repository.SaleItemRepository;
import com.stockeasy.stockeasy.service.DashboardService;
import com.stockeasy.stockeasy.service.ReportService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final SaleItemRepository saleItemRepository;
    private final DashboardService dashboardService;

    public ReportServiceImpl(SaleItemRepository saleItemRepository,
                             DashboardService dashboardService) {
        this.saleItemRepository = saleItemRepository;
        this.dashboardService = dashboardService;
    }

    @Override
    public List<TopMedicineDto> getTopMedicines(LocalDate start, LocalDate end, int limit) {
        return saleItemRepository
                .findTopMedicinesByQuantity(start, end, PageRequest.of(0, limit))
                .stream()
                .map(row -> new TopMedicineDto(
                        (String) row[0],
                        ((Number) row[1]).longValue(),
                        ((Number) row[2]).doubleValue()
                ))
                .toList();
    }

    @Override
    public List<TopCustomerDto> getTopCustomers(LocalDate start, LocalDate end, int limit) {
        return saleItemRepository
                .findTopCustomersByFrequency(start, end, PageRequest.of(0, limit))
                .stream()
                .map(row -> new TopCustomerDto(
                        ((Number) row[0]).longValue(),
                        (String) row[1],
                        (String) row[2],
                        ((Number) row[3]).longValue(),
                        ((Number) row[4]).doubleValue()
                ))
                .toList();
    }

    @Override
    public List<DailyRevenueDto> getDailyRevenue(LocalDate start, LocalDate end) {
        return saleItemRepository.findDailyRevenue(start, end)
                .stream()
                .map(row -> new DailyRevenueDto(
                        ((Date) row[0]).toLocalDate(),
                        ((Number) row[1]).doubleValue()
                ))
                .toList();
    }

    @Override
    public double getTotalRevenue(LocalDate start, LocalDate end) {
        return dashboardService.getTotalRevenue(start, end);
    }
}
