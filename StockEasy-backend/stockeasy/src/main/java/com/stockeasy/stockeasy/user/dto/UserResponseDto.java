package com.stockeasy.stockeasy.user.dto;

import com.stockeasy.stockeasy.user.entity.Role;
import com.stockeasy.stockeasy.user.entity.User;

public record UserResponseDto(
        Long id,
        String username,
        Role role,
        String firstName,
        String lastName,
        String phone,
        String businessName,
        String country,
        String state,
        String city,
        String streetAddress,
        String pinCode,
        String gstNumber,
        String aadhaarNumber,
        String panCardNumber,
        String drugLicenseNumber
) {
    public static UserResponseDto from(User u) {
        return new UserResponseDto(
                u.getId(),
                u.getUsername(),
                u.getRole(),
                u.getFirstName(),
                u.getLastName(),
                u.getPhone(),
                u.getBusinessName(),
                u.getCountry(),
                u.getState(),
                u.getCity(),
                u.getStreetAddress(),
                u.getPinCode(),
                u.getGstNumber(),
                u.getAadhaarNumber(),
                u.getPanCardNumber(),
                u.getDrugLicenseNumber()
        );
    }
}
