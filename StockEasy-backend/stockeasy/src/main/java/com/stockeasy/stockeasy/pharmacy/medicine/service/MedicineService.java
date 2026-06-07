package com.stockeasy.stockeasy.pharmacy.medicine.service;

import com.stockeasy.stockeasy.pharmacy.medicine.entity.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MedicineService {

    Medicine createMedicine(Medicine medicine);

    Medicine getMedicineById(Long medicineId);

    Page<Medicine> getAllMedicines(Pageable pageable);

    Medicine updateMedicine(Long medicineId, Medicine medicine);

    void deleteMedicine(Long medicineId);

    List<Medicine> getByCategory(String category);

    List<Medicine> getByBrand(String brand);

    List<Medicine> searchByName(String keyword);
}
