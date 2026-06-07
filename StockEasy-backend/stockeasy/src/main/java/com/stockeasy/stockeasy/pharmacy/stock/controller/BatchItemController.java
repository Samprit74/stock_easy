package com.stockeasy.stockeasy.pharmacy.stock.controller;

import com.stockeasy.stockeasy.pharmacy.stock.dto.response.BatchItemResponseFullDto;
import com.stockeasy.stockeasy.pharmacy.stock.dto.response.ExpiredStockReportDto;
import com.stockeasy.stockeasy.pharmacy.stock.dto.response.LowStockDto;
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
    public List<BatchItemResponseFullDto> getExpiredStock() {
        return batchItemService.getExpiredStock(LocalDate.now()).stream()
                .map(BatchItemResponseFullDto::from).toList();
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
    public List<BatchItemResponseFullDto> getExpiringSoonStock(
            @RequestParam(defaultValue = "30") int days
    ) {
        LocalDate start = LocalDate.now();
        LocalDate end = start.plusDays(days);
        return batchItemService.getExpiringStock(start, end).stream()
                .map(BatchItemResponseFullDto::from).toList();
    }

    @GetMapping("/medicine/{medicineId}")
    public List<BatchItemResponseFullDto> getByMedicine(@PathVariable Long medicineId) {
        return batchItemService.getByMedicine(medicineId).stream()
                .map(BatchItemResponseFullDto::from).toList();
    }

    @GetMapping("/batch/{batchId}")
    public List<BatchItemResponseFullDto> getByBatch(@PathVariable Long batchId) {
        return batchItemService.getByBatch(batchId).stream()
                .map(BatchItemResponseFullDto::from).toList();
    }

    @GetMapping("/low-stock")
    public List<LowStockDto> getLowStock(
            @RequestParam(defaultValue = "10") int threshold
    ) {
        return batchItemService.getLowStockMedicines(threshold);
    }
}
