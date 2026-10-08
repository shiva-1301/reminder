# Website Architecture Document

## 1. System Overview
The project is a full-stack healthcare reminder platform with:
- Frontend: React + Vite + Tailwind CSS (single-page application)
- Backend: Spring Boot (REST APIs)
- Data layer: PostgreSQL (via Spring Data JPA)

The application supports authentication and modular healthcare features such as drugs, reminders, prescriptions, pharmacies, and safety alerts.

---

## 2. High-Level Architecture

### 2.1 Frontend Layer
Responsibilities:
- Render all UI pages
- Handle navigation and route protection
- Collect user input and call backend APIs
- Store lightweight auth session marker in browser local storage

Main technologies:
- React Router for routing
- Tailwind CSS for styling
- Framer Motion for UI animations
- Lucide icons for UI iconography

### 2.2 Backend Layer
Responsibilities:
- Expose REST APIs
- Execute business logic in service classes
- Persist and query relational data using repository interfaces

Main technologies:
- Spring Boot Web MVC
- Spring Data JPA
- PostgreSQL JDBC driver
- Lombok

### 2.3 Database Layer
Responsibilities:
- Persist domain entities
- Support CRUD operations and query filtering

Database:
- PostgreSQL (Neon hosted database)

---

## 3. Backend Layered Architecture
The backend follows a standard layered design:

### 3.1 Controller Layer
Purpose:
- Accept HTTP requests
- Map request payloads and parameters
- Return API responses and status codes

Controllers:
- AuthController
- DrugController
- PharmacyController
- ReminderController
- PrescriptionController
- SafetyAlertController

### 3.2 Service Layer
Purpose:
- Implement business logic
- Validate or transform data before persistence
- Coordinate repository calls

Services:
- UserService
- DrugService
- PharmacyService
- ReminderService
- PrescriptionService
- SafetyAlertService

### 3.3 Repository Layer
Purpose:
- Abstract database access
- Provide CRUD operations and custom query methods

Repositories:
- UserRepository
- DrugRepository
- PharmacyRepository
- ReminderRepository
- PrescriptionRepository
- SafetyAlertRepository

### 3.4 Entity Layer
Purpose:
- Define relational data models used by JPA/Hibernate

Entities:
- User
- Drug
- Pharmacy
- Reminder
- Prescription
- SafetyAlert

---

## 4. API Module Architecture

### 4.1 Authentication Module
Base path: /api/auth
- POST /register
- POST /login

Flow:
- Controller receives credentials
- UserService checks user existence or password
- UserRepository queries or saves user
- String response returned

### 4.2 Drug Module
Base path: /api/drugs
- GET list and search
- GET by id
- POST create
- PUT update
- DELETE remove

### 4.3 Pharmacy Module
Base path: /api/pharmacies
- GET list and search
- GET by id
- POST create
- PUT update
- DELETE remove

### 4.4 Reminder Module
Base path: /api/reminders
- GET all
- GET by user id
- GET by id
- POST create
- PUT update
- DELETE remove

### 4.5 Prescription Module
Base path: /api/prescriptions
- GET all
- GET by user id
- GET by id
- POST create metadata
- PUT update metadata
- DELETE remove

### 4.6 Safety Alert Module
Base path: /api/alerts
- GET all
- GET by user id
- GET by id
- POST create
- PUT update
- DELETE remove

---

## 5. Frontend Application Architecture

### 5.1 Routing and Layout
Routing is defined in App.jsx and uses:
- Public routes: login, signup
- Protected routes inside AppLayout:
  - dashboard
  - profile
  - prescriptions
  - reminders
  - drugs
  - scanner
  - pharmacies
  - alerts

AppLayout responsibilities:
- Check localStorage for session key user
- Redirect to login if session is missing
- Render responsive shell with:
  - collapsible sidebar
  - top navbar
  - content outlet

### 5.2 UI Page Modules
Main page modules:
- DashboardPage
- ProfilePage
- PrescriptionsPage
- RemindersPage
- DrugDetailsPage
- DrugScanner
- PharmaciesPage
- SafetyAlertsPage

Current integration status:
- Auth pages are connected to backend auth APIs
- Dashboard feature pages currently still include local dummy state in UI logic and can be progressively wired to the newly implemented backend APIs

---

## 6. Request and Data Flow

### 6.1 User Login Flow
1. User opens login page.
2. Frontend sends POST request to /api/auth/login.
3. AuthController receives request and calls UserService.
4. UserService validates credentials through UserRepository.
5. Backend returns login result.
6. Frontend stores user marker in localStorage and routes to dashboard.

### 6.2 Protected Navigation Flow
1. User navigates to any protected page.
2. AppLayout checks localStorage user.
3. If missing, redirect to login.
4. If present, render sidebar + navbar + selected page.

### 6.3 Generic CRUD API Flow
1. Frontend triggers a module action (create/update/list/delete).
2. Request reaches relevant controller endpoint.
3. Controller delegates to service.
4. Service applies business rule defaults and validation.
5. Service calls repository.
6. Repository executes SQL through JPA/Hibernate.
7. Controller returns JSON response to frontend.

---

## 7. Security and Access Model
- CSRF is disabled in current configuration.
- Auth endpoints are explicitly permitted.
- Remaining endpoints are also currently permitted.
- CORS is enabled at controller level.
- Current auth model is basic session marker in browser storage, not JWT/token-based.

---

## 8. Deployment and Runtime Components

### 8.1 Frontend Runtime
- Served by Vite in development
- Built static assets for production deployment

### 8.2 Backend Runtime
- Spring Boot executable jar
- Runs on server port 8080

### 8.3 Data Runtime
- PostgreSQL database endpoint configured in application properties

---

## 9. Improvement Roadmap
- Replace localStorage marker auth with JWT-based authentication and authorization.
- Add multipart upload API for prescription files.
- Add OCR/scanner analysis backend module for DrugScanner.
- Introduce DTOs and validation annotations for strict API contracts.
- Add centralized exception handling and standardized error response format.
- Connect frontend module pages to the new backend CRUD endpoints fully.
