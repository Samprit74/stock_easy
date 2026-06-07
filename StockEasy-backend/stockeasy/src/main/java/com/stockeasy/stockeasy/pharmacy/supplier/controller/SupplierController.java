package com.stockeasy.stockeasy.pharmacy.supplier.controller;

import com.stockeasy.stockeasy.pharmacy.supplier.dto.response.SupplierResponseDto;
import com.stockeasy.stockeasy.pharmacy.supplier.entity.Supplier;
import com.stockeasy.stockeasy.pharmacy.supplier.service.SupplierService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping
    public SupplierResponseDto createSupplier(@RequestBody Supplier supplier) {
        return SupplierResponseDto.from(supplierService.createSupplier(supplier));
    }

    @GetMapping
    public Page<SupplierResponseDto> getAllSuppliers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return supplierService.getAllSuppliers(PageRequest.of(page, size))
                .map(SupplierResponseDto::from);
    }

    @GetMapping("/{id}")
    public SupplierResponseDto getSupplierById(@PathVariable Long id) {
        return SupplierResponseDto.from(supplierService.getSupplierById(id));
    }

    @PutMapping("/{id}")
    public SupplierResponseDto updateSupplier(
            @PathVariable Long id,
            @RequestBody Supplier supplier
    ) {
        return SupplierResponseDto.from(supplierService.updateSupplier(id, supplier));
    }

    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
    }
}
