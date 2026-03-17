# Pharmoco Database Schema Report

## Overview
This report documents the MongoDB-style schema shown in the provided diagram.

## Collections

### 1. users
- _id: ObjectID
- name: String
- email: String
- password: String
- role: String
- profile: Embedded document
  - age: Number
  - bloodGroup: String
  - medicalHistory: Array
  - doctorName: String
  - doctorContact: String
- createdAt: Date
- updatedAt: Date

### 2. drugs
- _id: ObjectID
- drugName: String
- genericName: String
- brand: String
- dose: String
- composition: String
- manufacturer: String
- route: String
- formulation: String
- sideEffects: String
- interactions: String
- contraindications: String
- warnings: String

### 3. prescriptions
- _id: ObjectID
- userId: ObjectID
- fileUrl: String
- uploadDate: Date

### 4. reminders
- _id: ObjectID
- userId: ObjectID
- medicineName: String
- dosage: String
- time: Date

## Relationships
- users (_id) -> prescriptions (userId)
  - One user can have multiple prescriptions.
- users (_id) -> reminders (userId)
  - One user can have multiple reminders.

## Design Notes
- The profile is modeled as an embedded document inside users.
- Prescriptions and reminders reference users by ObjectID (logical foreign key style).
- Drug-related safety details are centralized in the drugs collection.

## Suggested Indexes
- users.email (unique)
- prescriptions.userId
- reminders.userId
- drugs.drugName
- drugs.genericName

## Suggested Validation Rules
- users.email required and unique
- users.password required
- prescriptions.fileUrl required
- reminders.medicineName, dosage, and time required
- drugs.drugName and manufacturer required
