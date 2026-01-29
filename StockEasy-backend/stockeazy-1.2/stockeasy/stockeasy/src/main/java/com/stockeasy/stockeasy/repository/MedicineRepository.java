package com.stockeasy.stockeasy.repository;

import com.stockeasy.stockeasy.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    boolean existsByMedicineName(String medicineName);

    List<Medicine> findByCategoryIgnoreCase(String category);

    List<Medicine> findByBrandIgnoreCase(String brand);

    List<Medicine> findByMedicineNameContainingIgnoreCase(String keyword);
}
