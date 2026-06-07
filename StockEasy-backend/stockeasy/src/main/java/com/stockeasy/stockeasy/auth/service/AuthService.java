package com.stockeasy.stockeasy.auth.service;

import com.stockeasy.stockeasy.auth.dto.AuthResponse;
import com.stockeasy.stockeasy.auth.dto.LoginRequest;
import com.stockeasy.stockeasy.auth.dto.RegisterRequest;
import com.stockeasy.stockeasy.auth.jwt.JwtUtil;
import com.stockeasy.stockeasy.user.entity.Role;
import com.stockeasy.stockeasy.user.entity.User;
import com.stockeasy.stockeasy.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public void register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.username())) {
            throw new RuntimeException("Username already exists");
        }

        Role role = request.role();

        // safety: only ADMIN or STAFF allowed
        if (role != Role.ADMIN && role != Role.STAFF) {
            throw new RuntimeException("Invalid role");
        }

        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .role(role)
                .build();

        userRepository.save(user);
    }

    public AuthResponse loginAndReturnResponse(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.username(),
                                request.password()
                        )
                );

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        User user = userRepository
                .findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(userDetails);

        return new AuthResponse(
                token,
                user.getUsername(),
                "ROLE_" + user.getRole().name()
        );
    }
}
