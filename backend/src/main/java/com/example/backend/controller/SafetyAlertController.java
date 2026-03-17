package com.example.backend.controller;

import com.example.backend.entity.SafetyAlert;
import com.example.backend.service.SafetyAlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
@CrossOrigin
public class SafetyAlertController {

    private final SafetyAlertService safetyAlertService;

    @GetMapping
    public List<SafetyAlert> getAll() {
        return safetyAlertService.getAll();
    }

    @GetMapping("/user/{userId}")
    public List<SafetyAlert> getByUserId(@PathVariable Long userId) {
        return safetyAlertService.getByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SafetyAlert> getById(@PathVariable Long id) {
        SafetyAlert safetyAlert = safetyAlertService.getById(id);
        return safetyAlert != null ? ResponseEntity.ok(safetyAlert) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public SafetyAlert create(@RequestBody SafetyAlert safetyAlert) {
        return safetyAlertService.create(safetyAlert);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SafetyAlert> update(@PathVariable Long id, @RequestBody SafetyAlert safetyAlert) {
        SafetyAlert updated = safetyAlertService.update(id, safetyAlert);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return safetyAlertService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
