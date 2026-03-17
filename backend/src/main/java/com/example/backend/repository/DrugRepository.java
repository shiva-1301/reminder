package com.example.backend.repository;

import com.example.backend.entity.Drug;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DrugRepository extends JpaRepository<Drug, Long> {
    List<Drug> findByDrugNameContainingIgnoreCase(String drugName);
}
