package com.stockeasy.stockeasy.pharmacy.stock.controller;

import com.stockeasy.stockeasy.pharmacy.stock.dto.response.ExpiredStockReportDto;
import com.stockeasy.stockeasy.pharmacy.stock.dto.response.LowStockDto;
import com.stockeasy.stockeasy.pharmacy.stock.entity.BatchItem;
import com.stockeasy.stockeasy.pharmacy.stock.service.BatchItemService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/batch-items")
public class BatchItemController {

    private final BatchItemService batchItemService;

    public BatchItemController(BatchItemService batchItemService) {
        this.batchItemService = batchItemService;
    }

    @GetMapping("/expired")
    public List<BatchItem> getExpiredStock() {
        return batchItemService.getExpiredStock(LocalDate.now());
    }

    @GetMapping("/expired-report")
    public ExpiredStockReportDto getExpiredReport(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate asOf
    ) {
        return batchItemService.getExpiredStockReport(
                asOf != null ? asOf : LocalDate.now()
        );
    }

    @GetMapping("/expiring-soon")
    public List<BatchItem> getExpiringSoonStock(
            @RequestParam(defaultValue = "30") int days
    ) {
        LocalDate start = LocalDate.now();
        LocalDate end = start.plusDays(days);
        return batchItemService.getExpiringStock(start, end);
    }

    @GetMapping("/medicine/{medicineId}")
    public List<BatchItem> getByMedicine(@PathVariable Long medicineId) {
        return batchItemService.getByMedicine(medicineId);
    }

    @GetMapping("/batch/{batchId}")
    public List<BatchItem> getByBatch(@PathVariable Long batchId) {
        return batchItemService.getByBatch(batchId);
    }

    @GetMapping("/low-stock")
    public List<LowStockDto> getLowStock(
            @RequestParam(defaultValue = "10") int threshold
    ) {
        return batchItemService.getLowStockMedicines(threshold);
    }
}
