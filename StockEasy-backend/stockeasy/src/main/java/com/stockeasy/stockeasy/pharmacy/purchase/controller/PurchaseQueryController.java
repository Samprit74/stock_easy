package com.stockeasy.stockeasy.pharmacy.purchase.controller;

import com.stockeasy.stockeasy.pharmacy.purchase.dto.mapper.PurchaseMapper;
import com.stockeasy.stockeasy.pharmacy.purchase.dto.response.PurchaseResponseDto;
import com.stockeasy.stockeasy.pharmacy.stock.entity.BatchItem;
import com.stockeasy.stockeasy.pharmacy.stock.entity.PurchaseBatch;
import com.stockeasy.stockeasy.pharmacy.stock.repository.BatchItemRepository;
import com.stockeasy.stockeasy.pharmacy.stock.repository.PurchaseBatchRepository;
import com.stockeasy.stockeasy.shared.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseQueryController {

    private final PurchaseBatchRepository purchaseBatchRepository;
    private final BatchItemRepository batchItemRepository;

    public PurchaseQueryController(PurchaseBatchRepository purchaseBatchRepository,
                                   BatchItemRepository batchItemRepository) {
        this.purchaseBatchRepository = purchaseBatchRepository;
        this.batchItemRepository = batchItemRepository;
    }

    @GetMapping
    public Page<PurchaseResponseDto> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return purchaseBatchRepository.findAllByOrderByPurchaseDateDesc(pageable)
                .map(PurchaseMapper::toDto);
    }

    @GetMapping("/{id}")
    public PurchaseResponseDto getById(@PathVariable Long id) {
        PurchaseBatch batch = purchaseBatchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Purchase not found: " + id));
        List<BatchItem> items = batchItemRepository.findByBatch_BatchId(id);
        return PurchaseMapper.toDto(batch, items);
    }

    @GetMapping("/by-date")
    public Page<PurchaseResponseDto> getByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return purchaseBatchRepository.findByPurchaseDateBetween(start, end, pageable)
                .map(PurchaseMapper::toDto);
    }

    @GetMapping("/by-supplier/{supplierId}")
    public Page<PurchaseResponseDto> getBySupplier(
            @PathVariable Long supplierId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return purchaseBatchRepository
                .findBySupplier_SupplierIdOrderByPurchaseDateDesc(supplierId, pageable)
                .map(PurchaseMapper::toDto);
    }
}
