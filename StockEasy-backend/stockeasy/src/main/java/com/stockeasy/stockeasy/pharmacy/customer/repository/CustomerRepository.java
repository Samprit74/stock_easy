package com.stockeasy.stockeasy.pharmacy.customer.repository;

import com.stockeasy.stockeasy.pharmacy.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByPhone(String phone);

    @Modifying
    @Query("UPDATE Customer c SET c.totalOrders = c.totalOrders + 1 WHERE c.customerId = :id")
    void incrementOrderCount(@Param("id") Long customerId);
}
