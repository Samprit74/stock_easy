package com.stockeasy.stockeasy.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // ---------- PROFILE FIELDS (all optional) ----------

    private String firstName;
    private String lastName;
    private String phone;

    private String businessName;
    private String country;
    private String state;
    private String city;
    private String streetAddress;
    private String pinCode;

    private String gstNumber;
    private String aadhaarNumber;
    private String panCardNumber;
    private String drugLicenseNumber;
}
