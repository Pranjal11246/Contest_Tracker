# Contest Tracker

Contest Tracker is a full-stack web application for discovering and tracking competitive programming contests. It provides a secure authentication system, user dashboard, contest management features, and email-based account verification.

The project was built to explore full-stack application development using React, Spring Boot, MongoDB Atlas, and JWT authentication while implementing common production features such as email verification, password recovery, and protected APIs.

## Features

### Authentication

* User registration
* Email OTP verification
* JWT-based login
* Protected routes
* Logout functionality

### Account Management

* User profile page
* Forgot password workflow
* Password reset using OTP
* Verification status tracking

### Contest Management

* View available contests
* Upcoming contest tracking
* Ongoing contest monitoring
* Contest statistics dashboard
* External contest links

### Security

* BCrypt password hashing
* JWT authentication
* Email verification before login
* Stateless authentication
* Environment-based secret management

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* React Hot Toast

### Backend

* Spring Boot
* Spring Security
* JWT
* Lombok
* Maven

### Database

* MongoDB Atlas

### External Services

* Resend Email API

## Project Structure

### Backend

```text
backend/
├── config/
├── controller/
├── dto/
├── model/
├── repository/
├── security/
├── service/
└── BackendApplication.java
```

### Frontend

```text
frontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── routes/
└── package.json
```

## Authentication Flow

### Registration

1. User submits email and password.
2. OTP is generated and sent to the registered email.
3. User verifies the OTP.
4. Account is activated.

### Login

1. User enters credentials.
2. Backend validates the request.
3. JWT token is generated.
4. Protected resources become accessible.

### Password Reset

1. User requests password reset.
2. OTP is sent to the registered email.
3. OTP is verified.
4. Password is updated.

## Running Locally

### Prerequisites

* Java 21 or higher
* Node.js 18 or higher
* Maven
* MongoDB Atlas account
* Resend account

### Backend Setup

Clone the repository:

```bash
git clone https://github.com/your-username/contest-tracker.git
cd backend
```

Configure environment variables:

```properties
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
```

Run the application:

```bash
./mvnw spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Environment Variables

### Backend

```properties
MONGODB_URI=
JWT_SECRET=
RESEND_API_KEY=
```

### Frontend

```env
VITE_API_URL=
```

## API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/verify
POST /auth/login
POST /auth/forgot-password
POST /auth/reset-password
```

### User

```http
GET /profile
```

### Contests

```http
GET /contests/allcontests
POST /contests/savecontest
```

## Future Improvements

Some planned enhancements include:

* Contest bookmarking
* Contest reminders
* Advanced filtering
* Personalized recommendations
* Contest synchronization from external APIs
* Admin analytics

## Author

Pranjal Srivastava

GitHub: https://github.com/Pranjal11246

LinkedIn: https://www.linkedin.com/in/pranjal-srivastava-9a1a17328
