package com.stockeasy.stockeasy.service.impl;

import com.stockeasy.stockeasy.entity.Medicine;
import com.stockeasy.stockeasy.repository.MedicineRepository;
import com.stockeasy.stockeasy.service.MedicineService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineServiceImpl(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public Medicine createMedicine(Medicine medicine) {
        if (medicineRepository.existsByMedicineName(medicine.getMedicineName())) {
            throw new RuntimeException("Medicine already exists");
        }
        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine getMedicineById(Long medicineId) {
        return medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
    }

    @Override
    public Page<Medicine> getAllMedicines(Pageable pageable) {
        return medicineRepository.findAll(pageable);
    }

    @Override
    public Medicine updateMedicine(Long medicineId, Medicine medicine) {
        Medicine existing = getMedicineById(medicineId);
        existing.setMedicineName(medicine.getMedicineName());
        existing.setBrand(medicine.getBrand());
        existing.setCategory(medicine.getCategory());
        return medicineRepository.save(existing);
    }

    @Override
    public void deleteMedicine(Long medicineId) {
        medicineRepository.deleteById(medicineId);
    }
}
