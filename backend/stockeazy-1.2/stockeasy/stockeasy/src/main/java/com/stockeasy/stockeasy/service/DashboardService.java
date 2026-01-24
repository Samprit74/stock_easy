package com.stockeasy.stockeasy.service;

import java.time.LocalDate;

public interface DashboardService {

    long getTotalMedicinesInStock();

    long getTotalCustomers();

    double getTotalRevenue(LocalDate startDate, LocalDate endDate);

    double getMonthlySales(int year, int month);
}
