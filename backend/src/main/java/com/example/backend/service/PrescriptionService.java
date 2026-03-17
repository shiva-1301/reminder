package com.example.backend.service;

import com.example.backend.entity.Prescription;
import com.example.backend.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public List<Prescription> getAll() {
        return prescriptionRepository.findAll();
    }

    public List<Prescription> getByUserId(Long userId) {
        return prescriptionRepository.findByUserId(userId);
    }

    public Prescription getById(Long id) {
        return prescriptionRepository.findById(id).orElse(null);
    }

    public Prescription create(Prescription prescription) {
        if (prescription.getUploadDate() == null) {
            prescription.setUploadDate(LocalDateTime.now());
        }
        return prescriptionRepository.save(prescription);
    }

    public Prescription update(Long id, Prescription updated) {
        return prescriptionRepository.findById(id).map(existing -> {
            existing.setUserId(updated.getUserId());
            existing.setFileUrl(updated.getFileUrl());
            existing.setUploadDate(updated.getUploadDate());
            return prescriptionRepository.save(existing);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        if (!prescriptionRepository.existsById(id)) {
            return false;
        }
        prescriptionRepository.deleteById(id);
        return true;
    }
}
