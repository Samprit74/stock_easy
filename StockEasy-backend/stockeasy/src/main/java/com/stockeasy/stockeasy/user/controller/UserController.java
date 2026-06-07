package com.stockeasy.stockeasy.user.controller;

import com.stockeasy.stockeasy.user.dto.UpdateProfileRequest;
import com.stockeasy.stockeasy.user.dto.UpdateRoleRequest;
import com.stockeasy.stockeasy.user.dto.UserResponseDto;
import com.stockeasy.stockeasy.user.entity.User;
import com.stockeasy.stockeasy.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserResponseDto me(@AuthenticationPrincipal UserDetails principal) {
        return UserResponseDto.from(userService.getByUsername(principal.getUsername()));
    }

    @PutMapping("/me")
    public UserResponseDto updateMe(
            @AuthenticationPrincipal UserDetails principal,
            @RequestBody UpdateProfileRequest req
    ) {
        User updated = userService.updateProfile(principal.getUsername(), req);
        return UserResponseDto.from(updated);
    }

    @GetMapping
    public Page<UserResponseDto> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return userService.list(pageable).map(UserResponseDto::from);
    }

    @PutMapping("/{id}/role")
    public UserResponseDto updateRole(
            @PathVariable Long id,
            @RequestBody UpdateRoleRequest req
    ) {
        return UserResponseDto.from(userService.updateRole(id, req));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
