package com.stockeasy.stockeasy.security.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.stockeasy.stockeasy.user.entity.Role;

public record RegisterRequest(

        @NotBlank
        String username,

        @NotBlank
        String password,

        @NotNull
        Role role   // ADMIN or STAFF
) {
}
