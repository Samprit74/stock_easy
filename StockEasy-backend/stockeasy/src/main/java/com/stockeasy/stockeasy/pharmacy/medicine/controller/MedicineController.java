package com.stockeasy.stockeasy.pharmacy.medicine.controller;

import com.stockeasy.stockeasy.pharmacy.medicine.dto.response.MedicineResponseDto;
import com.stockeasy.stockeasy.pharmacy.medicine.entity.Medicine;
import com.stockeasy.stockeasy.pharmacy.medicine.service.MedicineService;
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
    public MedicineResponseDto createMedicine(@RequestBody Medicine medicine) {
        return MedicineResponseDto.from(medicineService.createMedicine(medicine));
    }

    @GetMapping
    public Page<MedicineResponseDto> getAllMedicines(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return medicineService.getAllMedicines(PageRequest.of(page, size))
                .map(MedicineResponseDto::from);
    }

    @GetMapping("/{id}")
    public MedicineResponseDto getMedicineById(@PathVariable Long id) {
        return MedicineResponseDto.from(medicineService.getMedicineById(id));
    }

    @PutMapping("/{id}")
    public MedicineResponseDto updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine medicine
    ) {
        return MedicineResponseDto.from(medicineService.updateMedicine(id, medicine));
    }

    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
    }

    @GetMapping("/category/{category}")
    public List<MedicineResponseDto> getByCategory(@PathVariable String category) {
        return medicineService.getByCategory(category).stream()
                .map(MedicineResponseDto::from).toList();
    }

    @GetMapping("/brand/{brand}")
    public List<MedicineResponseDto> getByBrand(@PathVariable String brand) {
        return medicineService.getByBrand(brand).stream()
                .map(MedicineResponseDto::from).toList();
    }

    @GetMapping("/search")
    public List<MedicineResponseDto> search(@RequestParam String q) {
        return medicineService.searchByName(q).stream()
                .map(MedicineResponseDto::from).toList();
    }
}
