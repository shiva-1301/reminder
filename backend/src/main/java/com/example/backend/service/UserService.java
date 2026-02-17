package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public String register(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already registered";
        }

        userRepository.save(user);
        return "User registered successfully";
    }

    public String login(User user) {

        return userRepository.findByEmail(user.getEmail())
                .map(u -> u.getPassword().equals(user.getPassword())
                        ? "Login successful"
                        : "Invalid password")
                .orElse("User not found");
    }
}
