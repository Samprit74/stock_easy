package com.stockeasy.stockeasy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sale_items")
public class SaleItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long saleItemId;

    @ManyToOne
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @ManyToOne
    @JoinColumn(name = "batch_item_id")
    private BatchItem batchItem;

    private int quantitySold;
    private double sellPrice;

    public SaleItem() {}

    public SaleItem(Sale sale, BatchItem batchItem, int quantitySold, double sellPrice) {
        this.sale = sale;
        this.batchItem = batchItem;
        this.quantitySold = quantitySold;
        this.sellPrice = sellPrice;
    }

    public Long getSaleItemId() {
        return saleItemId;
    }

    public void setSaleItemId(Long saleItemId) {
        this.saleItemId = saleItemId;
    }

    public Sale getSale() {
        return sale;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }

    public BatchItem getBatchItem() {
        return batchItem;
    }

    public void setBatchItem(BatchItem batchItem) {
        this.batchItem = batchItem;
    }

    public int getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(int quantitySold) {
        this.quantitySold = quantitySold;
    }

    public double getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(double sellPrice) {
        this.sellPrice = sellPrice;
    }
}
