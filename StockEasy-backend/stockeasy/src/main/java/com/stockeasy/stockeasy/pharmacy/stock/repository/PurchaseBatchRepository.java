package com.stockeasy.stockeasy.pharmacy.stock.repository;

import com.stockeasy.stockeasy.pharmacy.stock.entity.PurchaseBatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseBatchRepository extends JpaRepository<PurchaseBatch, Long> {
}
