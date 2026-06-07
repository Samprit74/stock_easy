package com.stockeasy.stockeasy.pharmacy.supplier.dto.response;

import com.stockeasy.stockeasy.pharmacy.supplier.entity.Supplier;

public record SupplierResponseDto(
        Long supplierId,
        String name,
        String phone,
        String email
) {
    public static SupplierResponseDto from(Supplier s) {
        return new SupplierResponseDto(
                s.getSupplierId(),
                s.getName(),
                s.getPhone(),
                s.getEmail()
        );
    }
}
