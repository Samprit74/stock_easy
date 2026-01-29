package com.stockeasy.stockeasy.controller;

import com.stockeasy.stockeasy.entity.BatchItem;
import com.stockeasy.stockeasy.service.BatchItemService;
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
}
