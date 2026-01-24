package com.stockeasy.stockeasy.controller;

import com.stockeasy.stockeasy.entity.Medicine;
import com.stockeasy.stockeasy.service.MedicineService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    // CREATE medicine
    @PostMapping
    public Medicine createMedicine(@RequestBody Medicine medicine) {
        return medicineService.createMedicine(medicine);
    }

    // GET medicines with pagination
    // example: /api/medicines?page=0&size=5
    @GetMapping
    public Page<Medicine> getAllMedicines(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return medicineService.getAllMedicines(PageRequest.of(page, size));
    }

    // GET medicine by ID
    @GetMapping("/{id}")
    public Medicine getMedicineById(@PathVariable Long id) {
        return medicineService.getMedicineById(id);
    }

    // UPDATE medicine
    @PutMapping("/{id}")
    public Medicine updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine medicine
    ) {
        return medicineService.updateMedicine(id, medicine);
    }

    // DELETE medicine
    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
    }
}
