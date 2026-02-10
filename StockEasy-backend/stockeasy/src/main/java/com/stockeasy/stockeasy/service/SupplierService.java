package com.stockeasy.stockeasy.service;

import com.stockeasy.stockeasy.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SupplierService {

    // Create new supplier
    Supplier createSupplier(Supplier supplier);

    // Get supplier by ID
    Supplier getSupplierById(Long supplierId);

    // Get all suppliers (paginated)
    Page<Supplier> getAllSuppliers(Pageable pageable);

    // Update supplier
    Supplier updateSupplier(Long supplierId, Supplier supplier);

    // Delete supplier
    void deleteSupplier(Long supplierId);
}
