package com.example.backend.controller;

import com.example.backend.entity.Reminder;
import com.example.backend.service.ReminderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@RequiredArgsConstructor
@CrossOrigin
public class ReminderController {

    private final ReminderService reminderService;

    @GetMapping
    public List<Reminder> getAll() {
        return reminderService.getAll();
    }

    @GetMapping("/user/{userId}")
    public List<Reminder> getByUserId(@PathVariable Long userId) {
        return reminderService.getByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reminder> getById(@PathVariable Long id) {
        Reminder reminder = reminderService.getById(id);
        return reminder != null ? ResponseEntity.ok(reminder) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Reminder create(@RequestBody Reminder reminder) {
        return reminderService.create(reminder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reminder> update(@PathVariable Long id, @RequestBody Reminder reminder) {
        Reminder updated = reminderService.update(id, reminder);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return reminderService.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
