package com.example.backend.service;

import com.example.backend.entity.Reminder;
import com.example.backend.repository.ReminderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReminderService {

    private final ReminderRepository reminderRepository;

    public List<Reminder> getAll() {
        return reminderRepository.findAll();
    }

    public List<Reminder> getByUserId(Long userId) {
        return reminderRepository.findByUserId(userId);
    }

    public Reminder getById(Long id) {
        return reminderRepository.findById(id).orElse(null);
    }

    public Reminder create(Reminder reminder) {
        if (reminder.getActive() == null) {
            reminder.setActive(true);
        }
        return reminderRepository.save(reminder);
    }

    public Reminder update(Long id, Reminder updated) {
        return reminderRepository.findById(id).map(existing -> {
            existing.setUserId(updated.getUserId());
            existing.setMedicineName(updated.getMedicineName());
            existing.setDosage(updated.getDosage());
            existing.setTime(updated.getTime());
            existing.setActive(updated.getActive());
            return reminderRepository.save(existing);
        }).orElse(null);
    }

    public boolean delete(Long id) {
        if (!reminderRepository.existsById(id)) {
            return false;
        }
        reminderRepository.deleteById(id);
        return true;
    }
}
