package com.stockeasy.stockeasy.controller;

import com.stockeasy.stockeasy.dto.mapper.SaleMapper;
import com.stockeasy.stockeasy.dto.response.SaleResponseDto;
import com.stockeasy.stockeasy.entity.Sale;
import com.stockeasy.stockeasy.exception.ResourceNotFoundException;
import com.stockeasy.stockeasy.service.SaleService;
import com.stockeasy.stockeasy.user.entity.User;
import com.stockeasy.stockeasy.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
public class SaleQueryController {

    private final SaleService saleService;
    private final UserRepository userRepository;

    public SaleQueryController(SaleService saleService, UserRepository userRepository) {
        this.saleService = saleService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public Page<SaleResponseDto> getSales(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal UserDetails principal
    ) {
        Pageable pageable = PageRequest.of(page, size);
        boolean isAdmin = principal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        Page<Sale> sales = isAdmin
                ? saleService.getSales(pageable)
                : saleService.getSalesByUser(loadUser(principal), pageable);

        return sales.map(SaleMapper::toDto);
    }

    @GetMapping("/{id}")
    public SaleResponseDto getSaleById(@PathVariable Long id) {
        Sale sale = saleService.getSales(PageRequest.of(0, 1))
                .stream()
                .filter(s -> s.getSaleId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Sale not found: " + id));

        return SaleMapper.toDtoWithItems(sale, saleService.getSaleItems(id));
    }

    @GetMapping("/by-customer/{customerId}")
    public Page<SaleResponseDto> getSalesByCustomer(
            @PathVariable Long customerId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return saleService.getSalesByCustomer(customerId, pageable)
                .map(SaleMapper::toDto);
    }

    @GetMapping("/my-bills")
    public Page<SaleResponseDto> getMyBills(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal UserDetails principal
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return saleService.getSalesByUser(loadUser(principal), pageable)
                .map(SaleMapper::toDto);
    }

    private User loadUser(UserDetails principal) {
        return userRepository.findByUsername(principal.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found: " + principal.getUsername()));
    }
}
