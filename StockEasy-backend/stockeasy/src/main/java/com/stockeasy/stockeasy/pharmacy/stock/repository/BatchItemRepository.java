package com.stockeasy.stockeasy.pharmacy.stock.repository;

import com.stockeasy.stockeasy.pharmacy.medicine.entity.Medicine;
import com.stockeasy.stockeasy.pharmacy.stock.entity.BatchItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BatchItemRepository extends JpaRepository<BatchItem, Long> {

    List<BatchItem>
    findByMedicineAndQuantityAvailableGreaterThanAndExpiryDateAfterOrderByExpiryDateAsc(
            Medicine medicine,
            int quantity,
            LocalDate date
    );

    List<BatchItem>
    findByMedicineAndQuantityAvailableGreaterThanAndExpiryDateAfterOrderByExpiryDateDesc(
            Medicine medicine,
            int quantity,
            LocalDate date
    );

    List<BatchItem>
    findByExpiryDateBeforeAndQuantityAvailableGreaterThan(
            LocalDate date,
            int quantity
    );

    List<BatchItem>
    findByExpiryDateBetweenAndQuantityAvailableGreaterThan(
            LocalDate startDate,
            LocalDate endDate,
            int quantity
    );

    long countByExpiryDateBeforeAndQuantityAvailableGreaterThan(
            LocalDate date,
            int quantity
    );

    long countByExpiryDateBetweenAndQuantityAvailableGreaterThan(
            LocalDate startDate,
            LocalDate endDate,
            int quantity
    );

    List<BatchItem> findByMedicine_MedicineId(Long medicineId);

    List<BatchItem> findByBatch_BatchId(Long batchId);

    @Query("SELECT COALESCE(SUM(b.quantityAvailable), 0) FROM BatchItem b")
    long getTotalAvailableStock();

    @Query("""
            SELECT m.medicineId AS medicineId,
                   m.medicineName AS medicineName,
                   m.brand AS brand,
                   m.category AS category,
                   COALESCE(SUM(b.quantityAvailable), 0L) AS totalAvailable
            FROM Medicine m
            LEFT JOIN BatchItem b
                ON b.medicine = m
                AND b.quantityAvailable > 0
                AND b.expiryDate > CURRENT_DATE
            GROUP BY m.medicineId, m.medicineName, m.brand, m.category
            HAVING COALESCE(SUM(b.quantityAvailable), 0L) <= :threshold
            ORDER BY COALESCE(SUM(b.quantityAvailable), 0L) ASC
            """)
    List<LowStockProjection> findLowStockMedicines(@Param("threshold") int threshold);

    interface LowStockProjection {
        Long getMedicineId();
        String getMedicineName();
        String getBrand();
        String getCategory();
        Long getTotalAvailable();
    }
}
