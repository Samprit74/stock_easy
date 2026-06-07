package com.stockeasy.stockeasy.service.impl;

import com.stockeasy.stockeasy.dto.response.LowStockDto;
import com.stockeasy.stockeasy.entity.BatchItem;
import com.stockeasy.stockeasy.repository.BatchItemRepository;
import com.stockeasy.stockeasy.service.BatchItemService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BatchItemServiceImpl implements BatchItemService {

    private final BatchItemRepository batchItemRepository;

    public BatchItemServiceImpl(BatchItemRepository batchItemRepository) {
        this.batchItemRepository = batchItemRepository;
    }

    @Override
    public List<BatchItem> getExpiredStock(LocalDate date) {
        return batchItemRepository
                .findByExpiryDateBeforeAndQuantityAvailableGreaterThan(date, 0);
    }

    @Override
    public List<BatchItem> getExpiringStock(LocalDate startDate, LocalDate endDate) {
        return batchItemRepository
                .findByExpiryDateBetweenAndQuantityAvailableGreaterThan(
                        startDate, endDate, 0
                );
    }

    @Override
    public long countExpiredStock(LocalDate date) {
        return batchItemRepository
                .countByExpiryDateBeforeAndQuantityAvailableGreaterThan(date, 0);
    }

    @Override
    public long countExpiringStock(LocalDate startDate, LocalDate endDate) {
        return batchItemRepository
                .countByExpiryDateBetweenAndQuantityAvailableGreaterThan(
                        startDate, endDate, 0
                );
    }

    @Override
    public List<BatchItem> getByMedicine(Long medicineId) {
        return batchItemRepository.findByMedicine_MedicineId(medicineId);
    }

    @Override
    public List<BatchItem> getByBatch(Long batchId) {
        return batchItemRepository.findByBatch_BatchId(batchId);
    }

    @Override
    public List<LowStockDto> getLowStockMedicines(int threshold) {
        return batchItemRepository.findLowStockMedicines(threshold);
    }
}
