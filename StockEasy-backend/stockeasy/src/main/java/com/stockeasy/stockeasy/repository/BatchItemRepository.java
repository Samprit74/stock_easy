package com.stockeasy.stockeasy.repository;

import com.stockeasy.stockeasy.entity.BatchItem;
import com.stockeasy.stockeasy.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface BatchItemRepository extends JpaRepository<BatchItem, Long> {

    // FEFO (used during sale)
    List<BatchItem>
    findByMedicineAndQuantityAvailableGreaterThanAndExpiryDateAfterOrderByExpiryDateAsc(
            Medicine medicine,
            int quantity,
            LocalDate date
    );

    // expired stock
    List<BatchItem>
    findByExpiryDateBeforeAndQuantityAvailableGreaterThan(
            LocalDate date,
            int quantity
    );

    // expiring soon
    List<BatchItem>
    findByExpiryDateBetweenAndQuantityAvailableGreaterThan(
            LocalDate startDate,
            LocalDate endDate,
            int quantity
    );

    // counts for dashboard
    long countByExpiryDateBeforeAndQuantityAvailableGreaterThan(
            LocalDate date,
            int quantity
    );

    long countByExpiryDateBetweenAndQuantityAvailableGreaterThan(
            LocalDate startDate,
            LocalDate endDate,
            int quantity
    );

    // filters
    List<BatchItem> findByMedicine_MedicineId(Long medicineId);

    List<BatchItem> findByBatch_BatchId(Long batchId);

    // total stock
    @Query("SELECT COALESCE(SUM(b.quantityAvailable), 0) FROM BatchItem b")
    long getTotalAvailableStock();
}
