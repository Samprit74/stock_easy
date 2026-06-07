package com.stockeasy.stockeasy.service.impl;

import com.stockeasy.stockeasy.entity.*;
import com.stockeasy.stockeasy.repository.*;
import com.stockeasy.stockeasy.service.SaleService;
import com.stockeasy.stockeasy.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final SaleItemRepository saleItemRepository;
    private final BatchItemRepository batchItemRepository;

    public SaleServiceImpl(SaleRepository saleRepository,
                           SaleItemRepository saleItemRepository,
                           BatchItemRepository batchItemRepository) {
        this.saleRepository = saleRepository;
        this.saleItemRepository = saleItemRepository;
        this.batchItemRepository = batchItemRepository;
    }

    @Override
    @Transactional
    public Sale createSale(Sale sale) {
        return saleRepository.save(sale);
    }

    // FEFO logic
    @Override
    @Transactional
    public void sellMedicine(Medicine medicine, int quantity, Sale sale, double sellPrice) {

        List<BatchItem> batches =
                batchItemRepository
                        .findByMedicineAndQuantityAvailableGreaterThanAndExpiryDateAfterOrderByExpiryDateAsc(
                                medicine, 0, LocalDate.now()
                        );

        int remainingQty = quantity;

        for (BatchItem batchItem : batches) {
            if (remainingQty <= 0) break;

            int available = batchItem.getQuantityAvailable();
            int deductQty = Math.min(available, remainingQty);

            batchItem.setQuantityAvailable(available - deductQty);
            batchItemRepository.save(batchItem);

            SaleItem saleItem = new SaleItem(
                    sale,
                    batchItem,
                    deductQty,
                    sellPrice
            );
            saleItemRepository.save(saleItem);

            remainingQty -= deductQty;
        }

        if (remainingQty > 0) {
            throw new RuntimeException(
                    "Insufficient stock for medicine: " + medicine.getMedicineName()
            );
        }
    }


    @Override
    public Page<Sale> getSales(Pageable pageable) {
        return saleRepository.findAllByOrderBySaleDateDesc(pageable);
    }

    @Override
    public Page<Sale> getSalesByUser(User user, Pageable pageable) {
        return saleRepository.findByCreatedByOrderBySaleDateDesc(user, pageable);
    }

    @Override
    public Page<Sale> getSalesByCustomer(Long customerId, Pageable pageable) {
        return saleRepository.findByCustomer_CustomerIdOrderBySaleDateDesc(
                customerId, pageable);
    }

    @Override
    public List<SaleItem> getSaleItems(Long saleId) {
        return saleItemRepository.findBySale_SaleId(saleId);
    }

    @Override
    public List<Sale> getSalesBetween(LocalDate start, LocalDate end) {
        return saleRepository.findBySaleDateBetween(start, end);
    }
}
