package com.stockeasy.stockeasy.auth.dto;

public record AuthResponse(
        String token,
        String username,
        String role
) {
}
