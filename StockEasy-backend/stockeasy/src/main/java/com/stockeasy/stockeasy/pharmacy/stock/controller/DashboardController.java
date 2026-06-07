package com.stockeasy.stockeasy.pharmacy.stock.controller;

import com.stockeasy.stockeasy.pharmacy.stock.dto.response.DashboardResponseDto;
import com.stockeasy.stockeasy.pharmacy.stock.service.BatchItemService;
import com.stockeasy.stockeasy.pharmacy.stock.service.DashboardService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final BatchItemService batchItemService;

    public DashboardController(DashboardService dashboardService,
                               BatchItemService batchItemService) {
        this.dashboardService = dashboardService;
        this.batchItemService = batchItemService;
    }

    @GetMapping("/summary")
    public DashboardResponseDto getSummary() {

        LocalDate now = LocalDate.now();

        long totalMedicines = dashboardService.getTotalMedicinesInStock();
        long totalCustomers = dashboardService.getTotalCustomers();

        double monthlySales = dashboardService.getMonthlySales(
                now.getYear(),
                now.getMonthValue()
        );

        long expired = batchItemService.countExpiredStock(now);
        long expiringSoon =
                batchItemService.countExpiringStock(now, now.plusDays(30));

        return new DashboardResponseDto(
                totalMedicines,
                totalCustomers,
                monthlySales,
                expiringSoon,
                expired
        );
    }
}
