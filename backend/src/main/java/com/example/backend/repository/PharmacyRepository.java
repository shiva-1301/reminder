package com.example.backend.repository;

import com.example.backend.entity.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {
    List<Pharmacy> findByNameContainingIgnoreCase(String name);
}
