package com.stockeasy.stockeasy.pharmacy.purchase.controller;

import com.stockeasy.stockeasy.pharmacy.medicine.entity.Medicine;
import com.stockeasy.stockeasy.pharmacy.medicine.repository.MedicineRepository;
import com.stockeasy.stockeasy.pharmacy.purchase.dto.request.PurchaseItemDto;
import com.stockeasy.stockeasy.pharmacy.purchase.dto.request.PurchaseRequestDto;
import com.stockeasy.stockeasy.pharmacy.purchase.service.PurchaseService;
import com.stockeasy.stockeasy.pharmacy.stock.entity.BatchItem;
import com.stockeasy.stockeasy.pharmacy.stock.entity.PurchaseBatch;
import com.stockeasy.stockeasy.pharmacy.stock.repository.BatchItemRepository;
import com.stockeasy.stockeasy.pharmacy.stock.repository.PurchaseBatchRepository;
import com.stockeasy.stockeasy.pharmacy.supplier.entity.Supplier;
import com.stockeasy.stockeasy.pharmacy.supplier.repository.SupplierRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;
    private final SupplierRepository supplierRepository;
    private final MedicineRepository medicineRepository;
    private final BatchItemRepository batchItemRepository;
    private final PurchaseBatchRepository purchaseBatchRepository;

    public PurchaseController(
            PurchaseService purchaseService,
            SupplierRepository supplierRepository,
            MedicineRepository medicineRepository,
            BatchItemRepository batchItemRepository,
            PurchaseBatchRepository purchaseBatchRepository
    ) {
        this.purchaseService = purchaseService;
        this.supplierRepository = supplierRepository;
        this.medicineRepository = medicineRepository;
        this.batchItemRepository = batchItemRepository;
        this.purchaseBatchRepository = purchaseBatchRepository;
    }

    @Transactional
    @PostMapping
    public String createPurchase(@Valid @RequestBody PurchaseRequestDto dto) {

        Supplier supplier = supplierRepository.findById(dto.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        PurchaseBatch batch = new PurchaseBatch(
                supplier,
                dto.getInvoiceNo(),
                dto.getPurchaseDate()
        );
        batch.setBatchNumber(dto.getBatchNumber());

        PurchaseBatch savedBatch = purchaseBatchRepository.save(batch);

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
