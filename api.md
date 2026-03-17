# API Report

## Overview
This file lists the APIs and API-like integrations currently used in this project.

## 1. Backend REST APIs (Spring Boot)
Base URL (local): `http://localhost:8080`

### 1.1 Auth APIs (`/api/auth`)

#### Register User
- Method: `POST`
- Endpoint: `/api/auth/register`
- Full URL: `http://localhost:8080/api/auth/register`
- Request Body (JSON):
  - `name` (string)
  - `email` (string)
  - `password` (string)
- Response: plain text message
  - Example: `User registered successfully`

#### Login User
- Method: `POST`
- Endpoint: `/api/auth/login`
- Full URL: `http://localhost:8080/api/auth/login`
- Request Body (JSON):
  - `email` (string)
  - `password` (string)
- Response: plain text message
  - Example: `Login successful`

### 1.2 Drugs APIs (`/api/drugs`) - IMPLEMENTED
- `GET /api/drugs`
- `GET /api/drugs?q={name}` (optional name filter)
- `GET /api/drugs/{id}`
- `POST /api/drugs`
- `PUT /api/drugs/{id}`
- `DELETE /api/drugs/{id}`

Core fields:
- `drugName`, `genericName`, `brand`, `dose`, `composition`, `manufacturer`, `route`, `formulation`, `sideEffects`, `interactions`, `contraindications`, `warnings`

### 1.3 Pharmacies APIs (`/api/pharmacies`) - IMPLEMENTED
- `GET /api/pharmacies`
- `GET /api/pharmacies?q={name}` (optional name filter)
- `GET /api/pharmacies/{id}`
- `POST /api/pharmacies`
- `PUT /api/pharmacies/{id}`
- `DELETE /api/pharmacies/{id}`

Core fields:
- `name`, `address`, `distance`, `phone`, `hours`, `rating`, `open`

### 1.4 Safety Alerts APIs (`/api/alerts`) - IMPLEMENTED
- `GET /api/alerts`
- `GET /api/alerts/user/{userId}`
- `GET /api/alerts/{id}`
- `POST /api/alerts`
- `PUT /api/alerts/{id}`
- `DELETE /api/alerts/{id}`

Core fields:
- `userId`, `title`, `description`, `severity`, `alertDate`, `read`

### 1.5 Reminders APIs (`/api/reminders`) - IMPLEMENTED
- `GET /api/reminders`
- `GET /api/reminders/user/{userId}`
- `GET /api/reminders/{id}`
- `POST /api/reminders`
- `PUT /api/reminders/{id}`
- `DELETE /api/reminders/{id}`

Core fields:
- `userId`, `medicineName`, `dosage`, `time`, `active`

### 1.6 Prescriptions APIs (`/api/prescriptions`) - IMPLEMENTED
- `GET /api/prescriptions`
- `GET /api/prescriptions/user/{userId}`
- `GET /api/prescriptions/{id}`
- `POST /api/prescriptions`
- `PUT /api/prescriptions/{id}`
- `DELETE /api/prescriptions/{id}`

Core fields:
- `userId`, `fileUrl`, `uploadDate`
- Note: current implementation stores uploaded prescription metadata (URL + timestamp). File binary upload endpoint is not added yet.

## 2. Frontend API Calls in Use
The frontend calls the backend auth endpoints using `fetch` in the following files:
- `frontend/src/components/ui/demo.tsx` -> login API
- `frontend/src/components/ui/sign-up-page.tsx` -> register API
- `frontend/src/Login.jsx` -> login API
- `frontend/src/Register.jsx` -> register API

Dashboard module pages still use dummy frontend state right now and are not yet wired to the new backend module APIs.

## 3. External Services / URLs Used
### 3.1 Database Service (Backend)
- Type: PostgreSQL (Neon)
- Connection used via JDBC in backend config
- Not a frontend HTTP API, but an external data service used by backend

### 3.2 External Image URLs
- Unsplash image URL is used in UI components for visuals
- This is a static content URL usage, not application business API integration

## 4. APIs Not Yet Implemented (Current State)
The following are still pending:
- Drug scanner/OCR backend API
- Prescription binary file upload endpoint (multipart)

## 5. Notes
- Auth API responses are plain strings (not JSON objects).
- CORS is enabled on auth controller (`@CrossOrigin`).
- Current backend stack indicates relational DB usage (JPA + PostgreSQL), not MongoDB.
- Newly added module APIs return JSON entities and use standard HTTP codes (`200`, `201`-style via POST response body, `204`, `404`).
