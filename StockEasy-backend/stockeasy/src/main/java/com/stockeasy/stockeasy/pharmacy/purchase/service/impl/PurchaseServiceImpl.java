package com.stockeasy.stockeasy.pharmacy.purchase.service.impl;

import com.stockeasy.stockeasy.pharmacy.purchase.service.PurchaseService;
import com.stockeasy.stockeasy.pharmacy.stock.entity.PurchaseBatch;
import com.stockeasy.stockeasy.pharmacy.stock.repository.PurchaseBatchRepository;
import org.springframework.stereotype.Service;

@Service
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseBatchRepository purchaseBatchRepository;

    public PurchaseServiceImpl(PurchaseBatchRepository purchaseBatchRepository) {
        this.purchaseBatchRepository = purchaseBatchRepository;
    }

    @Override
    public PurchaseBatch createPurchaseBatch(PurchaseBatch purchaseBatch) {
        return purchaseBatchRepository.save(purchaseBatch);
    }
}
