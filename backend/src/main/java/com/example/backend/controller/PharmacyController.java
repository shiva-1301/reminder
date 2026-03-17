package com.example.backend.controller;

import com.example.backend.entity.Pharmacy;
import com.example.backend.service.PharmacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacies")
@RequiredArgsConstructor
@CrossOrigin
public class PharmacyController {

    private final PharmacyService pharmacyService;

    @GetMapping
    public List<Pharmacy> getAll(@RequestParam(required = false) String q) {
        return pharmacyService.getAll(q);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pharmacy> getById(@PathVariable Long id) {
        Pharmacy pharmacy = pharmacyService.getById(id);
        return pharmacy != null ? ResponseEntity.ok(pharmacy) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Pharmacy create(@RequestBody Pharmacy pharmacy) {
        return pharmacyService.create(pharmacy);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pharmacy> update(@PathVariable Long id, @RequestBody Pharmacy pharmacy) {
        Pharmacy updated = pharmacyService.update(id, pharmacy);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return pharmacyService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
