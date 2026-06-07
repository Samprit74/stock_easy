package com.stockeasy.stockeasy.controller;

import com.stockeasy.stockeasy.dto.response.DailyRevenueDto;
import com.stockeasy.stockeasy.dto.response.TopCustomerDto;
import com.stockeasy.stockeasy.dto.response.TopMedicineDto;
import com.stockeasy.stockeasy.service.ReportService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/top-medicines")
    public List<TopMedicineDto> topMedicines(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return reportService.getTopMedicines(start, end, limit);
    }

    @GetMapping("/top-customers")
    public List<TopCustomerDto> topCustomers(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,
            @RequestParam(defaultValue = "10") int limit
    ) {
        return reportService.getTopCustomers(start, end, limit);
    }

    @GetMapping("/daily-revenue")
    public List<DailyRevenueDto> dailyRevenue(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        return reportService.getDailyRevenue(start, end);
    }

    @GetMapping("/revenue")
    public Map<String, Object> revenue(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        return Map.of(
                "start", start,
                "end", end,
                "totalRevenue", reportService.getTotalRevenue(start, end)
        );
    }
}
