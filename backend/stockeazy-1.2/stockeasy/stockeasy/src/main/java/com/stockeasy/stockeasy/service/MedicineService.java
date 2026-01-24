package com.stockeasy.stockeasy.service;

import com.stockeasy.stockeasy.entity.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MedicineService {

    Medicine createMedicine(Medicine medicine);

    Medicine getMedicineById(Long medicineId);

    Page<Medicine> getAllMedicines(Pageable pageable);

    Medicine updateMedicine(Long medicineId, Medicine medicine);

    void deleteMedicine(Long medicineId);
}
