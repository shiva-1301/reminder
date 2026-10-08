package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {

    public static final String LOGIN_SUCCESS = "Login successful";
    public static final String REGISTER_SUCCESS = "User registered successfully";
    private static final String INVALID_CREDENTIALS = "Invalid email or password";
    private static final Pattern EMAIL = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(User user) {
        if (user == null || user.getEmail() == null || !EMAIL.matcher(user.getEmail().trim()).matches()) {
            throw new IllegalArgumentException("Please enter a valid email address");
        }
        if (user.getPassword() == null || user.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }

        String email = user.getEmail().trim().toLowerCase();
        if (userRepository.findByEmail(email).isPresent()) {
            return "Email already registered";
        }

        user.setId(null);
        user.setEmail(email);
        user.setName(user.getName() == null ? null : user.getName().trim());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return REGISTER_SUCCESS;
    }

    public String login(User user) {
        if (user == null || user.getEmail() == null || user.getPassword() == null) {
            return INVALID_CREDENTIALS;
        }

        return userRepository.findByEmail(user.getEmail().trim().toLowerCase())
                .filter(u -> passwordMatches(u, user.getPassword()))
                .map(u -> LOGIN_SUCCESS)
                // Same message for unknown email and wrong password, so accounts can't be enumerated
                .orElse(INVALID_CREDENTIALS);
    }

    /**
     * Checks a BCrypt hash. Accounts created before hashing was added still hold a
     * plain-text password; if that matches, it is upgraded to a hash on the spot.
     */
    private boolean passwordMatches(User stored, String raw) {
        String saved = stored.getPassword();
        if (saved == null) {
            return false;
        }
        if (saved.startsWith("$2a$") || saved.startsWith("$2b$") || saved.startsWith("$2y$")) {
            return passwordEncoder.matches(raw, saved);
        }
        if (saved.equals(raw)) {
            stored.setPassword(passwordEncoder.encode(raw));
            userRepository.save(stored);
            return true;
        }
        return false;
    }
}
