package com.stockeasy.stockeasy.service.impl;

import com.stockeasy.stockeasy.entity.PurchaseBatch;
import com.stockeasy.stockeasy.repository.PurchaseBatchRepository;
import com.stockeasy.stockeasy.service.PurchaseService;
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
