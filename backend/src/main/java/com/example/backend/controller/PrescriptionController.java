package com.example.backend.controller;

import com.example.backend.entity.Prescription;
import com.example.backend.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@RequiredArgsConstructor
@CrossOrigin
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @GetMapping
    public List<Prescription> getAll() {
        return prescriptionService.getAll();
    }

    @GetMapping("/user/{userId}")
    public List<Prescription> getByUserId(@PathVariable Long userId) {
        return prescriptionService.getByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getById(@PathVariable Long id) {
        Prescription prescription = prescriptionService.getById(id);
        return prescription != null ? ResponseEntity.ok(prescription) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Prescription create(@RequestBody Prescription prescription) {
        return prescriptionService.create(prescription);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prescription> update(@PathVariable Long id, @RequestBody Prescription prescription) {
        Prescription updated = prescriptionService.update(id, prescription);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return prescriptionService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
