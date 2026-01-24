package com.stockeasy.stockeasy.service.impl;

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
        return batchItemRepository.findByExpiryDateBeforeAndQuantityAvailableGreaterThan(date, 0);
    }

    @Override
    public List<BatchItem> getExpiringStock(LocalDate startDate, LocalDate endDate) {
        return batchItemRepository.findByExpiryDateBetweenAndQuantityAvailableGreaterThan(
                startDate, endDate, 0);
    }
}
