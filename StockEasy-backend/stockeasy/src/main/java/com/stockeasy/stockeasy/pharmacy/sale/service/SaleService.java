package com.stockeasy.stockeasy.pharmacy.sale.service;

import com.stockeasy.stockeasy.pharmacy.medicine.entity.Medicine;
import com.stockeasy.stockeasy.pharmacy.sale.entity.Sale;
import com.stockeasy.stockeasy.pharmacy.sale.entity.SaleItem;
import com.stockeasy.stockeasy.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface SaleService {

    Sale createSale(Sale sale);

    void sellMedicine(
            Medicine medicine,
            int quantity,
            Sale sale,
            double sellPrice,
            boolean freshestFirst
    );


    Page<Sale> getSales(Pageable pageable);

    Page<Sale> getSalesByUser(User user, Pageable pageable);

    Page<Sale> getSalesByCustomer(Long customerId, Pageable pageable);

    List<SaleItem> getSaleItems(Long saleId);

    List<Sale> getSalesBetween(LocalDate start, LocalDate end);

    Sale returnSale(Long saleId);
}
