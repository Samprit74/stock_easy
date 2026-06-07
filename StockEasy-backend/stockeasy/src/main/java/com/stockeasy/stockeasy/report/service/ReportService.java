package com.stockeasy.stockeasy.report.service;

import com.stockeasy.stockeasy.report.dto.response.DailyRevenueDto;
import com.stockeasy.stockeasy.report.dto.response.TopCustomerDto;
import com.stockeasy.stockeasy.report.dto.response.TopMedicineDto;

import java.time.LocalDate;
import java.util.List;

public interface ReportService {

    List<TopMedicineDto> getTopMedicines(LocalDate start, LocalDate end, int limit);

    List<TopCustomerDto> getTopCustomers(LocalDate start, LocalDate end, int limit);

    List<DailyRevenueDto> getDailyRevenue(LocalDate start, LocalDate end);

    double getTotalRevenue(LocalDate start, LocalDate end);
}
