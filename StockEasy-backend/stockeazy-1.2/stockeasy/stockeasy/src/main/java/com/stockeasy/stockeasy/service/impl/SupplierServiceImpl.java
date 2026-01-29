package com.stockeasy.stockeasy.service.impl;

import com.stockeasy.stockeasy.entity.Supplier;
import com.stockeasy.stockeasy.repository.SupplierRepository;
import com.stockeasy.stockeasy.service.SupplierService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    @Override
    public Supplier getSupplierById(Long supplierId) {
        return supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + supplierId));
    }

    @Override
    public Page<Supplier> getAllSuppliers(Pageable pageable) {
        return supplierRepository.findAll(pageable);
    }

    @Override
    public Supplier updateSupplier(Long supplierId, Supplier supplier) {
        Supplier existingSupplier = getSupplierById(supplierId);

        existingSupplier.setName(supplier.getName());
        existingSupplier.setPhone(supplier.getPhone());
        existingSupplier.setEmail(supplier.getEmail());

        return supplierRepository.save(existingSupplier);
    }

    @Override
    public void deleteSupplier(Long supplierId) {
        Supplier supplier = getSupplierById(supplierId);
        supplierRepository.delete(supplier);
    }
}
