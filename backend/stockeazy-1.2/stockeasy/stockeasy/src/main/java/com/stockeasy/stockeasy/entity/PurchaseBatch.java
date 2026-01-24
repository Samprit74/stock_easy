package com.stockeasy.stockeasy.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "purchase_batches")
public class PurchaseBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long batchId;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    private String invoiceNo;
    private LocalDate purchaseDate;

    public PurchaseBatch() {}

    public PurchaseBatch(Supplier supplier, String invoiceNo, LocalDate purchaseDate) {
        this.supplier = supplier;
        this.invoiceNo = invoiceNo;
        this.purchaseDate = purchaseDate;
    }

    public Long getBatchId() {
        return batchId;
    }

    public void setBatchId(Long batchId) {
        this.batchId = batchId;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
}
