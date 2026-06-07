package com.stockeasy.stockeasy.repository;

import com.stockeasy.stockeasy.dto.response.LowStockDto;
import com.stockeasy.stockeasy.entity.BatchItem;
import com.stockeasy.stockeasy.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    // Freshest-first (used for regular customers)
    List<BatchItem>
    findByMedicineAndQuantityAvailableGreaterThanAndExpiryDateAfterOrderByExpiryDateDesc(
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

    /**
     * Medicines whose total non-expired stock across all batches
     * is at or below the given threshold. Sorted ascending by stock
     * so the most critical items come first.
     */
    @Query("""
            SELECT new com.stockeasy.stockeasy.dto.response.LowStockDto(
                m.medicineId,
                m.medicineName,
                m.brand,
                m.category,
                CAST(COALESCE(SUM(b.quantityAvailable), 0) AS int),
                :threshold)
            FROM Medicine m
            LEFT JOIN BatchItem b
                ON b.medicine = m
                AND b.quantityAvailable > 0
                AND b.expiryDate > CURRENT_DATE
            GROUP BY m.medicineId, m.medicineName, m.brand, m.category
            HAVING COALESCE(SUM(b.quantityAvailable), 0) <= :threshold
            ORDER BY COALESCE(SUM(b.quantityAvailable), 0) ASC
            """)
    List<LowStockDto> findLowStockMedicines(@Param("threshold") int threshold);
}
