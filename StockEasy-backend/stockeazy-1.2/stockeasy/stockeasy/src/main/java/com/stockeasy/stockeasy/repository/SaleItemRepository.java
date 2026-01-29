package com.stockeasy.stockeasy.repository;

import com.stockeasy.stockeasy.entity.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {

    List<SaleItem> findBySale_SaleId(Long saleId);
}
