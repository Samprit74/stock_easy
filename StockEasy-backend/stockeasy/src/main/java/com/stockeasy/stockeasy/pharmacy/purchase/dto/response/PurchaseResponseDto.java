package com.stockeasy.stockeasy.pharmacy.purchase.dto.response;

import java.time.LocalDate;
import java.util.List;

public class PurchaseResponseDto {

    private Long batchId;
    private String batchNumber;
    private String invoiceNo;
    private LocalDate purchaseDate;
    private Long supplierId;
    private String supplierName;
    private List<PurchaseLineItemDto> items;

    public PurchaseResponseDto() {}

    public PurchaseResponseDto(Long batchId,
                               String batchNumber,
                               String invoiceNo,
                               LocalDate purchaseDate,
                               Long supplierId,
                               String supplierName,
                               List<PurchaseLineItemDto> items) {
        this.batchId = batchId;
        this.batchNumber = batchNumber;
        this.invoiceNo = invoiceNo;
        this.purchaseDate = purchaseDate;
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.items = items;
    }

    public Long getBatchId() { return batchId; }
    public void setBatchId(Long batchId) { this.batchId = batchId; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public String getInvoiceNo() { return invoiceNo; }
    public void setInvoiceNo(String invoiceNo) { this.invoiceNo = invoiceNo; }

    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }

    public Long getSupplierId() { return supplierId; }
    public void setSupplierId(Long supplierId) { this.supplierId = supplierId; }

    public String getSupplierName() { return supplierName; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }

    public List<PurchaseLineItemDto> getItems() { return items; }
    public void setItems(List<PurchaseLineItemDto> items) { this.items = items; }
}
