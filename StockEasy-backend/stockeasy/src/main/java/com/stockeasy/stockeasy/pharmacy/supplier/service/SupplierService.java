package com.stockeasy.stockeasy.pharmacy.supplier.service;

import com.stockeasy.stockeasy.pharmacy.supplier.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SupplierService {

    Supplier createSupplier(Supplier supplier);

    Supplier getSupplierById(Long supplierId);

    Page<Supplier> getAllSuppliers(Pageable pageable);

    Supplier updateSupplier(Long supplierId, Supplier supplier);

    void deleteSupplier(Long supplierId);
}
