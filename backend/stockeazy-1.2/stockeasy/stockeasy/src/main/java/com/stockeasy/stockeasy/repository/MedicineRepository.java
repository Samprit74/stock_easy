package com.stockeasy.stockeasy.repository;

import com.stockeasy.stockeasy.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    boolean existsByMedicineName(String medicineName);
}
