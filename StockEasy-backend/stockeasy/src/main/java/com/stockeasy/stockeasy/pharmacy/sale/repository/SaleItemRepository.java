package com.stockeasy.stockeasy.pharmacy.sale.repository;

import com.stockeasy.stockeasy.pharmacy.sale.entity.SaleItem;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {

    List<SaleItem> findBySale_SaleId(Long saleId);

    @Query("""
            SELECT bi.medicine.medicineName AS medicineName,
                   SUM(si.quantitySold) AS totalQuantity,
                   SUM(si.quantitySold * si.sellPrice) AS totalRevenue
            FROM SaleItem si
            JOIN si.batchItem bi
            WHERE si.sale.saleDate BETWEEN :start AND :end
            GROUP BY bi.medicine.medicineName
            ORDER BY SUM(si.quantitySold) DESC
            """)
    List<Object[]> findTopMedicinesByQuantity(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end,
            Pageable pageable
    );

    @Query("""
            SELECT s.customer.customerId AS customerId,
                   s.customer.name AS customerName,
                   s.customer.phone AS phone,
                   COUNT(s) AS orderCount,
                   COALESCE(SUM(s.totalAmount), 0) AS totalSpent
            FROM Sale s
            WHERE s.saleDate BETWEEN :start AND :end
              AND s.customer IS NOT NULL
            GROUP BY s.customer.customerId, s.customer.name, s.customer.phone
            ORDER BY COUNT(s) DESC, COALESCE(SUM(s.totalAmount), 0) DESC
            """)
    List<Object[]> findTopCustomersByFrequency(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end,
            Pageable pageable
    );

    @Query("""
            SELECT FUNCTION('DATE', s.saleDate) AS day,
                   COALESCE(SUM(s.totalAmount), 0) AS revenue
            FROM Sale s
            WHERE s.saleDate BETWEEN :start AND :end
            GROUP BY FUNCTION('DATE', s.saleDate)
            ORDER BY FUNCTION('DATE', s.saleDate) ASC
            """)
    List<Object[]> findDailyRevenue(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );
}
