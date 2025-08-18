
# DocApprove 

**DocApprove** is an online document verification portal that allows authorized users to upload, review, and track the status of submitted documents securely using JWT-based authentication.


---

## Project Structure

- `Entity/` – JPA entity classes (`User`, `Document`, `Review`)
- `Repository/` – Spring Data JPA interfaces
- `Service/` – Business logic layer (User, Document, Review services)
- `Controller/` – REST APIs for user registration, authentication, and document workflow
- `Security/` – JWT token-based Spring Security configuration
- `resources/` – `application.properties`, static files

---

## Features

-  JWT-based user authentication
-  Secure registration & login endpoints
-  Token validation filter for protected routes
-  Upload and manage documents
-  Review workflow with comments and decisions
-  Approval logs & status tracking
-  Dashboard for analytics (Planned)
-  Role-based access control (Coming Soon)

---

##  Tech Stack

- Java 17  
- Spring Boot 3.5.x  
- Spring Security (with JWT)  
- MySQL  
- Maven  
- (Planned) React.js frontend

---

##  Setup (for Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/doc-approve.git
   cd doc-approve
   ```

2. **Configure your MySQL database in `application.properties`:**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/documentflow
   spring.datasource.username=root
   spring.datasource.password=your-password
   ```

3. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

---

##  Authentication Flow

- **Register:** `POST /register`  
  Registers a new user (password is securely encoded)

- **Login:** `POST /login`  
  Returns a JWT token upon valid credentials

- **Protected Endpoints:**  
  Pass token as Bearer in `Authorization` header:
  ```
  Authorization: Bearer <your-jwt-token>
  ```

---

##  Author

**Avdhut Mali**  
[GitHub](https://github.com/avadhutmali)

---

## 📜 License

MIT License (or your preferred license)

