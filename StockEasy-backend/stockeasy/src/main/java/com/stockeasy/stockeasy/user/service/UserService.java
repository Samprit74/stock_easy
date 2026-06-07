package com.stockeasy.stockeasy.user.service;

import com.stockeasy.stockeasy.shared.exception.ResourceNotFoundException;
import com.stockeasy.stockeasy.user.dto.UpdateProfileRequest;
import com.stockeasy.stockeasy.user.dto.UpdateRoleRequest;
import com.stockeasy.stockeasy.user.entity.User;
import com.stockeasy.stockeasy.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found: " + username));
    }

    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found: " + id));
    }

    public Page<User> list(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Transactional
    public User updateProfile(String username, UpdateProfileRequest req) {
        User user = getByUsername(username);
        user.setFirstName(req.firstName());
        user.setLastName(req.lastName());
        user.setPhone(req.phone());
        user.setBusinessName(req.businessName());
        user.setCountry(req.country());
        user.setState(req.state());
        user.setCity(req.city());
        user.setStreetAddress(req.streetAddress());
        user.setPinCode(req.pinCode());
        user.setGstNumber(req.gstNumber());
        user.setAadhaarNumber(req.aadhaarNumber());
        user.setPanCardNumber(req.panCardNumber());
        user.setDrugLicenseNumber(req.drugLicenseNumber());
        return userRepository.save(user);
    }

    @Transactional
    public User updateRole(Long id, UpdateRoleRequest req) {
        User user = getById(id);
        user.setRole(req.role());
        return userRepository.save(user);
    }

    @Transactional
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found: " + id);
        }
        userRepository.deleteById(id);
    }
}
