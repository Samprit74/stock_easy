package com.stockeasy.stockeasy.controller;

import com.stockeasy.stockeasy.dto.request.PurchaseItemDto;
import com.stockeasy.stockeasy.dto.request.PurchaseRequestDto;
import com.stockeasy.stockeasy.entity.*;
import com.stockeasy.stockeasy.repository.*;
import com.stockeasy.stockeasy.service.PurchaseService;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;
    private final SupplierRepository supplierRepository;
    private final MedicineRepository medicineRepository;
    private final BatchItemRepository batchItemRepository;

    public PurchaseController(
            PurchaseService purchaseService,
            SupplierRepository supplierRepository,
            MedicineRepository medicineRepository,
            BatchItemRepository batchItemRepository
    ) {
        this.purchaseService = purchaseService;
        this.supplierRepository = supplierRepository;
        this.medicineRepository = medicineRepository;
        this.batchItemRepository = batchItemRepository;
    }

    @Transactional
    @PostMapping
    public String createPurchase(@RequestBody PurchaseRequestDto dto) {

        Supplier supplier = supplierRepository.findById(dto.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        PurchaseBatch batch = new PurchaseBatch(
                supplier,
                dto.getInvoiceNo(),
                dto.getPurchaseDate()
        );

        PurchaseBatch savedBatch = purchaseService.createPurchaseBatch(batch);

        for (PurchaseItemDto item : dto.getItems()) {

            Medicine medicine = medicineRepository.findById(item.getMedicineId())
                    .orElseThrow(() -> new RuntimeException("Medicine not found"));

            BatchItem batchItem = new BatchItem(
                    savedBatch,
                    medicine,
                    item.getQuantity(),
                    item.getManufactureDate(),
                    item.getExpiryDate(),
                    item.getBuyPrice()
            );

            batchItemRepository.save(batchItem);
        }

        return "Purchase batch created successfully";
    }
}
