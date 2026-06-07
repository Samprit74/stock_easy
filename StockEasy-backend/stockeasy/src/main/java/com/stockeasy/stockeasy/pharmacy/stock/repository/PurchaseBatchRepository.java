package com.stockeasy.stockeasy.pharmacy.stock.repository;

import com.stockeasy.stockeasy.pharmacy.stock.entity.PurchaseBatch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface PurchaseBatchRepository extends JpaRepository<PurchaseBatch, Long> {

    Page<PurchaseBatch> findAllByOrderByPurchaseDateDesc(Pageable pageable);

    Page<PurchaseBatch> findByPurchaseDateBetween(
            LocalDate start, LocalDate end, Pageable pageable);

    Page<PurchaseBatch> findBySupplier_SupplierIdOrderByPurchaseDateDesc(
            Long supplierId, Pageable pageable);
}
