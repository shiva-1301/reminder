package com.example.backend.repository;

import com.example.backend.entity.SafetyAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SafetyAlertRepository extends JpaRepository<SafetyAlert, Long> {
    List<SafetyAlert> findByUserId(Long userId);
}
