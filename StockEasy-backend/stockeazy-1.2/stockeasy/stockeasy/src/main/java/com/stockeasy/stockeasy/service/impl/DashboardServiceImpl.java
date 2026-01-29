package com.stockeasy.stockeasy.service.impl;

import com.stockeasy.stockeasy.repository.BatchItemRepository;
import com.stockeasy.stockeasy.repository.CustomerRepository;
import com.stockeasy.stockeasy.repository.SaleRepository;
import com.stockeasy.stockeasy.service.DashboardService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final BatchItemRepository batchItemRepository;
    private final CustomerRepository customerRepository;
    private final SaleRepository saleRepository;

    public DashboardServiceImpl(BatchItemRepository batchItemRepository,
                                CustomerRepository customerRepository,
                                SaleRepository saleRepository) {
        this.batchItemRepository = batchItemRepository;
        this.customerRepository = customerRepository;
        this.saleRepository = saleRepository;
    }

    @Override
    public long getTotalMedicinesInStock() {
        //  Optimized: DB does the sum
        return batchItemRepository.getTotalAvailableStock();
    }

    @Override
    public long getTotalCustomers() {
        return customerRepository.count();
    }

    @Override
    public double getTotalRevenue(LocalDate startDate, LocalDate endDate) {
        return saleRepository.findBySaleDateBetween(startDate, endDate)
                .stream()
                .mapToDouble(s -> s.getTotalAmount())
                .sum();
    }

    @Override
    public double getMonthlySales(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        return getTotalRevenue(start, end);
    }
}
