package com.stockeasy.stockeasy.user.dto;

public record UpdateProfileRequest(
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
}
