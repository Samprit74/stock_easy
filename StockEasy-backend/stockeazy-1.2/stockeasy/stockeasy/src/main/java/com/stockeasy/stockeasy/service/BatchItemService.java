package com.stockeasy.stockeasy.service;

import com.stockeasy.stockeasy.entity.BatchItem;

import java.time.LocalDate;
import java.util.List;

public interface BatchItemService {

    // expired stock
    List<BatchItem> getExpiredStock(LocalDate date);

    // expiring soon stock
    List<BatchItem> getExpiringStock(LocalDate startDate, LocalDate endDate);

    // counts (used by dashboard)
    long countExpiredStock(LocalDate date);

    long countExpiringStock(LocalDate startDate, LocalDate endDate);

    // filter helpers
    List<BatchItem> getByMedicine(Long medicineId);

    List<BatchItem> getByBatch(Long batchId);
}
