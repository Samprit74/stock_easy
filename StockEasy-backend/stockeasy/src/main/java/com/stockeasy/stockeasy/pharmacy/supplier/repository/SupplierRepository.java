package com.stockeasy.stockeasy.pharmacy.supplier.repository;

import com.stockeasy.stockeasy.pharmacy.supplier.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
