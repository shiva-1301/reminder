package com.example.backend.controller;

import com.example.backend.entity.Drug;
import com.example.backend.service.DrugService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drugs")
@RequiredArgsConstructor
@CrossOrigin
public class DrugController {

    private final DrugService drugService;

    @GetMapping
    public List<Drug> getAll(@RequestParam(required = false) String q) {
        return drugService.getAll(q);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Drug> getById(@PathVariable Long id) {
        Drug drug = drugService.getById(id);
        return drug != null ? ResponseEntity.ok(drug) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Drug create(@RequestBody Drug drug) {
        return drugService.create(drug);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Drug> update(@PathVariable Long id, @RequestBody Drug drug) {
        Drug updated = drugService.update(id, drug);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return drugService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
