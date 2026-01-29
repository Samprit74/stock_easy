package com.stockeasy.stockeasy.security.dto;

public record AuthResponse(
        String token,
        String username,
        String role
) {
}
