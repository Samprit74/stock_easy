package com.stockeasy.stockeasy.pharmacy.sale.dto.mapper;

import com.stockeasy.stockeasy.pharmacy.sale.dto.response.SaleItemResponseDto;
import com.stockeasy.stockeasy.pharmacy.sale.dto.response.SaleResponseDto;
import com.stockeasy.stockeasy.pharmacy.sale.entity.Sale;
import com.stockeasy.stockeasy.pharmacy.sale.entity.SaleItem;

import java.util.List;

public final class SaleMapper {

    private SaleMapper() {}

    public static SaleResponseDto toDto(Sale s) {
        return new SaleResponseDto(
                s.getSaleId(),
                s.getCustomer() != null ? s.getCustomer().getName() : null,
                s.getCustomer() != null ? s.getCustomer().getPhone() : null,
                s.getSaleDate(),
                s.getTotalAmount(),
                List.of()
        );
    }

    public static SaleResponseDto toDtoWithItems(Sale s, List<SaleItem> items) {
        SaleResponseDto dto = toDto(s);
        dto.setItems(items.stream().map(SaleMapper::toItemDto).toList());
        return dto;
    }

    public static SaleItemResponseDto toItemDto(SaleItem si) {
        return new SaleItemResponseDto(
                si.getBatchItem() != null && si.getBatchItem().getMedicine() != null
                        ? si.getBatchItem().getMedicine().getMedicineName()
                        : null,
                si.getQuantitySold(),
                si.getSellPrice()
        );
    }
}
