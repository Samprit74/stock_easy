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

    // GET expired stock
    // example: /api/batch-items/expired
    @GetMapping("/expired")
    public List<BatchItem> getExpiredStock() {
        return batchItemService.getExpiredStock(LocalDate.now());
    }

    // GET expiring soon stock (next N days)
    // example: /api/batch-items/expiring-soon?days=30
    @GetMapping("/expiring-soon")
    public List<BatchItem> getExpiringSoonStock(
            @RequestParam(defaultValue = "30") int days
    ) {
        LocalDate start = LocalDate.now();
        LocalDate end = start.plusDays(days);
        return batchItemService.getExpiringStock(start, end);
    }
}
