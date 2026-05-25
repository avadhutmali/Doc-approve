# DocApprove

**DocApprove** is an online document verification portal that allows authorized users to upload, review, and track the status of submitted documents securely using JWT-based authentication.

---

## Project Structure

- `documentflow_backend/` – Spring Boot backend (REST APIs, JWT, JPA)
- `documentflow_frontend/` – React frontend (Vite, Tailwind, role-based UI)

---

## Features

- JWT-based user authentication
- Secure registration & login endpoints
- Token validation filter for protected routes
- Upload and manage documents
- Review workflow with comments and decisions
- Approval logs & status tracking
- Role-based access control

---

## Tech Stack

- Java 21
- Spring Boot 3.5.x
- Spring Security (JWT)
- PostgreSQL
- Maven
- React 18 + Vite + Tailwind

---

## Setup (Development)

### Backend (PostgreSQL)

1. **Create database and user** (password: `1629`):

   ```sql
   CREATE DATABASE documentflow;
   CREATE USER documentflow_user WITH PASSWORD '1629';
   GRANT ALL PRIVILEGES ON DATABASE documentflow TO documentflow_user;
   ```

2. **Configure database** in `documentflow_backend/src/main/resources/application.properties` (already added):

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/documentflow
   spring.datasource.username=documentflow_user
   spring.datasource.password=1629
   ```

3. **Run the backend**:

   ```bash
   cd documentflow_backend
   ./mvnw spring-boot:run
   ```

### Frontend

1. **Install dependencies**:

   ```bash
   cd documentflow_frontend
   npm install
   ```

2. **Run the frontend**:

   ```bash
   npm run dev
   ```

---

## Authentication Flow

- **Register:** `POST /auth/register`
- **Login:** `POST /auth/login`
- **Protected Endpoints:**

  ```
  Authorization: Bearer <your-jwt-token>
  ```

---

## Notes

- Frontend uses role-based dashboards (USER/REVIEWER/ADMIN).
- If you previously stored tokens as `token`, clear localStorage and log in again.

---

## Author

**Avdhut Mali**

---

## License

MIT License (or your preferred license)
