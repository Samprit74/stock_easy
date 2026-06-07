package com.stockeasy.stockeasy.pharmacy.purchase.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public class PurchaseRequestDto {

    @NotNull
    private Long supplierId;

    private String batchNumber;

    @NotNull
    private String invoiceNo;

    @NotNull
    private LocalDate purchaseDate;

    @NotEmpty
    @Valid
    private List<PurchaseItemDto> items;

    public PurchaseRequestDto() {}

    public PurchaseRequestDto(Long supplierId,
                              String invoiceNo,
                              LocalDate purchaseDate,
                              List<PurchaseItemDto> items) {
        this.supplierId = supplierId;
        this.invoiceNo = invoiceNo;
        this.purchaseDate = purchaseDate;
        this.items = items;
    }

    public Long getSupplierId() { return supplierId; }
    public void setSupplierId(Long supplierId) { this.supplierId = supplierId; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public String getInvoiceNo() { return invoiceNo; }
    public void setInvoiceNo(String invoiceNo) { this.invoiceNo = invoiceNo; }

    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }

    public List<PurchaseItemDto> getItems() { return items; }
    public void setItems(List<PurchaseItemDto> items) { this.items = items; }
}
