package com.stockeasy.stockeasy.repository;

import com.stockeasy.stockeasy.entity.BatchItem;
import com.stockeasy.stockeasy.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface BatchItemRepository extends JpaRepository<BatchItem, Long> {

    // FEFO: earliest expiring first
    List<BatchItem> findByMedicineAndQuantityAvailableGreaterThanAndExpiryDateAfterOrderByExpiryDateAsc(
            Medicine medicine, int quantity, LocalDate date);

    // Expired stock
    List<BatchItem> findByExpiryDateBeforeAndQuantityAvailableGreaterThan(
            LocalDate date, int quantity);

    // Expiring soon
    List<BatchItem> findByExpiryDateBetweenAndQuantityAvailableGreaterThan(
            LocalDate startDate, LocalDate endDate, int quantity);

    //  total available stock (safe & efficient)
    @Query("SELECT COALESCE(SUM(b.quantityAvailable), 0) FROM BatchItem b")
    long getTotalAvailableStock();
}
