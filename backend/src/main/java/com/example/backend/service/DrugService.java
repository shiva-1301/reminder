package com.example.backend.service;

import com.example.backend.entity.Drug;
import com.example.backend.repository.DrugRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrugService {

    private final DrugRepository drugRepository;

    public List<Drug> getAll(String query) {
        if (query == null || query.isBlank()) {
            return drugRepository.findAll();
        }
        return drugRepository.findByDrugNameContainingIgnoreCase(query);
    }

    public Drug getById(Long id) {
        return drugRepository.findById(id).orElse(null);
    }

    public Drug create(Drug drug) {
        return drugRepository.save(drug);
    }

    public Drug update(Long id, Drug updated) {
        return drugRepository.findById(id).map(existing -> {
            existing.setDrugName(updated.getDrugName());
            existing.setGenericName(updated.getGenericName());
            existing.setBrand(updated.getBrand());
            existing.setDose(updated.getDose());
            existing.setComposition(updated.getComposition());
            existing.setManufacturer(updated.getManufacturer());
            existing.setRoute(updated.getRoute());
            existing.setFormulation(updated.getFormulation());
            existing.setSideEffects(updated.getSideEffects());
            existing.setInteractions(updated.getInteractions());
            existing.setContraindications(updated.getContraindications());
            existing.setWarnings(updated.getWarnings());
            return drugRepository.save(existing);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        if (!drugRepository.existsById(id)) {
            return false;
        }
        drugRepository.deleteById(id);
        return true;
    }
}
