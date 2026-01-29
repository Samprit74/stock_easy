package com.stockeasy.stockeasy.controller;

import com.stockeasy.stockeasy.entity.Medicine;
import com.stockeasy.stockeasy.service.MedicineService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @PostMapping
    public Medicine createMedicine(@RequestBody Medicine medicine) {
        return medicineService.createMedicine(medicine);
    }

    @GetMapping
    public Page<Medicine> getAllMedicines(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return medicineService.getAllMedicines(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public Medicine getMedicineById(@PathVariable Long id) {
        return medicineService.getMedicineById(id);
    }

    @PutMapping("/{id}")
    public Medicine updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine medicine
    ) {
        return medicineService.updateMedicine(id, medicine);
    }

    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
    }

    // 🔍 FILTER APIs (used later)
    @GetMapping("/category/{category}")
    public List<Medicine> getByCategory(@PathVariable String category) {
        return medicineService.getByCategory(category);
    }

    @GetMapping("/brand/{brand}")
    public List<Medicine> getByBrand(@PathVariable String brand) {
        return medicineService.getByBrand(brand);
    }

    @GetMapping("/search")
    public List<Medicine> search(@RequestParam String q) {
        return medicineService.searchByName(q);
    }
}
