package com.stockeasy.stockeasy.pharmacy.stock.service;

import com.stockeasy.stockeasy.pharmacy.stock.dto.response.ExpiredStockReportDto;
import com.stockeasy.stockeasy.pharmacy.stock.dto.response.LowStockDto;
import com.stockeasy.stockeasy.pharmacy.stock.entity.BatchItem;

import java.time.LocalDate;
import java.util.List;

public interface BatchItemService {

    List<BatchItem> getExpiredStock(LocalDate date);

    List<BatchItem> getExpiringStock(LocalDate startDate, LocalDate endDate);

    long countExpiredStock(LocalDate date);

    long countExpiringStock(LocalDate startDate, LocalDate endDate);

    List<BatchItem> getByMedicine(Long medicineId);

    List<BatchItem> getByBatch(Long batchId);

    List<LowStockDto> getLowStockMedicines(int threshold);

    ExpiredStockReportDto getExpiredStockReport(LocalDate asOf);
}
