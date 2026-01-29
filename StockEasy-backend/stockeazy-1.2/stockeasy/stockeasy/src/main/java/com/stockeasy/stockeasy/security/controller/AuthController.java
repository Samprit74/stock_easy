package com.stockeasy.stockeasy.security.controller;

import com.stockeasy.stockeasy.security.dto.AuthResponse;
import com.stockeasy.stockeasy.security.dto.LoginRequest;
import com.stockeasy.stockeasy.security.dto.RegisterRequest;
import com.stockeasy.stockeasy.security.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8080")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public void register(@RequestBody @Valid RegisterRequest request) {
        authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody @Valid LoginRequest request) {
        return authService.loginAndReturnResponse(request);
    }
}
