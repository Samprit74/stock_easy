package com.stockeasy.stockeasy.controller;

import com.stockeasy.stockeasy.dto.response.DiscountInfoDto;
import com.stockeasy.stockeasy.entity.BatchItem;
import com.stockeasy.stockeasy.exception.ResourceNotFoundException;
import com.stockeasy.stockeasy.repository.BatchItemRepository;
import com.stockeasy.stockeasy.util.DiscountCalculator;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/discounts")
public class DiscountController {

    private final BatchItemRepository batchItemRepository;

    public DiscountController(BatchItemRepository batchItemRepository) {
        this.batchItemRepository = batchItemRepository;
    }

    @GetMapping("/preview")
    public DiscountInfoDto preview(
            @RequestParam Long batchItemId,
            @RequestParam double originalPrice
    ) {
        BatchItem bi = batchItemRepository.findById(batchItemId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "BatchItem not found: " + batchItemId));
        return DiscountCalculator.evaluate(bi.getExpiryDate(), originalPrice);
    }

    @GetMapping("/by-expiry")
    public DiscountInfoDto byExpiry(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate expiryDate,
            @RequestParam double originalPrice
    ) {
        return DiscountCalculator.evaluate(expiryDate, originalPrice);
    }
}
