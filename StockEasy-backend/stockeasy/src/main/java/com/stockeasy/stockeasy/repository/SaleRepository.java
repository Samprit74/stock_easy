package com.stockeasy.stockeasy.repository;

import com.stockeasy.stockeasy.entity.Sale;
import com.stockeasy.stockeasy.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    Page<Sale> findAllByOrderBySaleDateDesc(Pageable pageable);

    List<Sale> findBySaleDateBetween(LocalDate startDate, LocalDate endDate);

    Page<Sale> findByCreatedByOrderBySaleDateDesc(User createdBy, Pageable pageable);

    Page<Sale> findByCustomer_CustomerIdOrderBySaleDateDesc(
            Long customerId, Pageable pageable);
}
