package com.example.backend.service;

import com.example.backend.entity.Pharmacy;
import com.example.backend.repository.PharmacyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PharmacyService {

    private final PharmacyRepository pharmacyRepository;

    public List<Pharmacy> getAll(String query) {
        if (query == null || query.isBlank()) {
            return pharmacyRepository.findAll();
        }
        return pharmacyRepository.findByNameContainingIgnoreCase(query);
    }

    public Pharmacy getById(Long id) {
        return pharmacyRepository.findById(id).orElse(null);
    }

    public Pharmacy create(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    public Pharmacy update(Long id, Pharmacy updated) {
        return pharmacyRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setAddress(updated.getAddress());
            existing.setDistance(updated.getDistance());
            existing.setPhone(updated.getPhone());
            existing.setHours(updated.getHours());
            existing.setRating(updated.getRating());
            existing.setOpen(updated.getOpen());
            return pharmacyRepository.save(existing);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        if (!pharmacyRepository.existsById(id)) {
            return false;
        }
        pharmacyRepository.deleteById(id);
        return true;
    }
}
