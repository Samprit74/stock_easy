package com.stockeasy.stockeasy.controller;

import com.stockeasy.stockeasy.dto.request.SaleItemDto;
import com.stockeasy.stockeasy.dto.request.SaleRequestDto;
import com.stockeasy.stockeasy.entity.*;
import com.stockeasy.stockeasy.repository.MedicineRepository;
import com.stockeasy.stockeasy.service.CustomerService;
import com.stockeasy.stockeasy.service.SaleService;
import com.stockeasy.stockeasy.user.entity.User;
import com.stockeasy.stockeasy.user.repository.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final SaleService saleService;
    private final CustomerService customerService;
    private final MedicineRepository medicineRepository;
    private final UserRepository userRepository;

    public SaleController(SaleService saleService,
                          CustomerService customerService,
                          MedicineRepository medicineRepository,
                          UserRepository userRepository) {
        this.saleService = saleService;
        this.customerService = customerService;
        this.medicineRepository = medicineRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public String createSale(
            @RequestBody SaleRequestDto dto,
            @AuthenticationPrincipal UserDetails principal
    ) {

        Customer customer = customerService.createOrGetCustomer(
                new Customer(
                        dto.getCustomer().getName(),
                        dto.getCustomer().getPhone(),
                        dto.getCustomer().getEmail()
                )
        );

        Sale sale = new Sale(
                customer,
                LocalDate.now(),
                dto.getTotalAmount()
        );

        if (principal != null) {
            User user = userRepository.findByUsername(principal.getUsername())
                    .orElse(null);
            sale.setCreatedBy(user);
        }

        Sale savedSale = saleService.createSale(sale);

        for (SaleItemDto item : dto.getItems()) {
            Medicine medicine = medicineRepository.findById(item.getMedicineId())
                    .orElseThrow(() -> new RuntimeException("Medicine not found"));

            double sellPrice = item.getSellPrice();
            if (sellPrice <= 0 && medicine.getDefaultSellPrice() != null) {
                sellPrice = medicine.getDefaultSellPrice();
            }

            saleService.sellMedicine(
                    medicine,
                    item.getQuantity(),
                    savedSale,
                    sellPrice
            );
        }

        return "Sale completed successfully";
    }
}
