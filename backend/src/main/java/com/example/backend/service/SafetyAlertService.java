package com.example.backend.service;

import com.example.backend.entity.SafetyAlert;
import com.example.backend.repository.SafetyAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SafetyAlertService {

    private final SafetyAlertRepository safetyAlertRepository;

    public List<SafetyAlert> getAll() {
        return safetyAlertRepository.findAll();
    }

    public List<SafetyAlert> getByUserId(Long userId) {
        return safetyAlertRepository.findByUserId(userId);
    }

    public SafetyAlert getById(Long id) {
        return safetyAlertRepository.findById(id).orElse(null);
    }

    public SafetyAlert create(SafetyAlert safetyAlert) {
        if (safetyAlert.getAlertDate() == null) {
            safetyAlert.setAlertDate(LocalDateTime.now());
        }
        if (safetyAlert.getRead() == null) {
            safetyAlert.setRead(false);
        }
        return safetyAlertRepository.save(safetyAlert);
    }

    public SafetyAlert update(Long id, SafetyAlert updated) {
        return safetyAlertRepository.findById(id).map(existing -> {
            existing.setUserId(updated.getUserId());
            existing.setTitle(updated.getTitle());
            existing.setDescription(updated.getDescription());
            existing.setSeverity(updated.getSeverity());
            existing.setAlertDate(updated.getAlertDate());
            existing.setRead(updated.getRead());
            return safetyAlertRepository.save(existing);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        if (!safetyAlertRepository.existsById(id)) {
            return false;
        }
        safetyAlertRepository.deleteById(id);
        return true;
    }
}
