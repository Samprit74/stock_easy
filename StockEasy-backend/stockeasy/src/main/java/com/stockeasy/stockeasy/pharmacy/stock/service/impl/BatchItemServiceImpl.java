package com.stockeasy.stockeasy.pharmacy.stock.service.impl;

import com.stockeasy.stockeasy.pharmacy.stock.dto.response.ExpiredStockLineDto;
import com.stockeasy.stockeasy.pharmacy.stock.dto.response.ExpiredStockReportDto;
import com.stockeasy.stockeasy.pharmacy.stock.dto.response.LowStockDto;
import com.stockeasy.stockeasy.pharmacy.stock.entity.BatchItem;
import com.stockeasy.stockeasy.pharmacy.stock.repository.BatchItemRepository;
import com.stockeasy.stockeasy.pharmacy.stock.service.BatchItemService;
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
        return batchItemRepository.findLowStockMedicines(threshold).stream()
                .map(p -> new LowStockDto(
                        p.getMedicineId(),
                        p.getMedicineName(),
                        p.getBrand(),
                        p.getCategory(),
                        p.getTotalAvailable() == null ? 0 : p.getTotalAvailable().intValue(),
                        threshold))
                .toList();
    }

    @Override
    public ExpiredStockReportDto getExpiredStockReport(LocalDate asOf) {
        List<BatchItem> expired = getExpiredStock(asOf);

        List<ExpiredStockLineDto> lines = expired.stream()
                .map(b -> {
                    int qty = b.getQuantityAvailable();
                    double loss = qty * b.getBuyPrice();
                    return new ExpiredStockLineDto(
                            b.getMedicine().getMedicineName(),
                            b.getMedicine().getBrand(),
                            b.getMedicine().getCategory(),
                            b.getBatch() != null ? b.getBatch().getBatchNumber() : null,
                            b.getExpiryDate(),
                            qty,
                            b.getBuyPrice(),
                            loss
                    );
                })
                .toList();

        int totalUnits = lines.stream().mapToInt(ExpiredStockLineDto::quantityExpired).sum();
        double totalLoss = lines.stream().mapToDouble(ExpiredStockLineDto::totalLoss).sum();

        return new ExpiredStockReportDto(
                asOf,
                lines.size(),
                totalUnits,
                totalLoss,
                lines
        );
    }
}
