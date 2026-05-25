# 🎬 Alpha Cinema

### Movie Theater Online Ticket Booking System

<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/.NET_9-5C2D91?style=for-the-badge&logo=.net&logoColor=white" alt=".Net" />
  <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
</p>

**A complete platform for managing and booking movie theater tickets online with realtime updates**

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Setup &amp; Installation](#-setup--installation)
- [▶️ Running the Application](#-running-the-application)
- [📚 API Documentation](#-api-documentation)
- [🎯 Advanced Features](#-advanced-features)
- [🐛 Troubleshooting](#-troubleshooting)
- [👥 Contributors](#-contributors)

---

## ✨ Features

### 👤 User Management

- ✅ User Registration / Login with JWT Authentication
- ✅ Refresh Token Mechanism (Auto-renewal)
- ✅ Profile Management
- ✅ Transaction History
- ✅ Role-Based Access Control (RBAC)

### 🎬 Movie & Theater Management

- ✅ Full Movie Information Management (Title, Description, Poster, Genre, Language, Age Rating, ...)
- ✅ Movie Theater Management
- ✅ Screening Room Management
- ✅ Detailed Showtime Management (Time, Duration, Price, ...)
- ✅ Flexible Seat Layout Management
- ✅ News & Promotional Banners

### 🎫 Ticket Booking & Payment System

- ✅ Intuitive Seat Selection Interface (Realtime)
- ✅ Seat Hold Management with Timeout
- ✅ Create, Update, Cancel Bookings
- ✅ VNPAY Sandbox Payment Integration
- ✅ Webhook Callback for Payment Result Handling
- ✅ Detailed Payment History

### ⚡ Realtime & Notifications

- ✅ Realtime Seat Status Updates (Redis Pub/Sub)
- ✅ Broadcast Notifications to All Clients
- ✅ Double-Booking Prevention

### 📊 Reports & Analytics

- ✅ Revenue Dashboard
- ✅ Ticket Sales Reports by Movie/Theater
- ✅ Customer Statistics
- ✅ PDF Report Export

---

## 🛠️ Tech Stack

### 🔧 Backend Stack

| Technology            | Version | Purpose           |
| --------------------- | ------- | ----------------- |
| ASP.NET Core          | 8.0+    | Web API Framework |
| Entity Framework Core | Latest  | ORM & Database    |
| MySQL                 | 8.0+    | Database          |
| Redis                 | 7.0+    | Cache & Pub/Sub   |
| JWT                   | -       | Authentication    |
| Swagger/OpenAPI       | Latest  | API Documentation |
| StackExchange.Redis   | Latest  | Redis Client      |
| BCrypt.NET-Next       | -       | Password Hashing  |
| AutoMapper            | -       | Object Mapping    |

### ⚛️ Frontend Stack

| Technology      | Version | Purpose           |
| --------------- | ------- | ----------------- |
| React           | 19.1+   | UI Framework      |
| TypeScript      | 5.8+    | Type Safety       |
| Vite            | 7.0+    | Build Tool        |
| Ant Design      | 5.26+   | UI Components     |
| TailwindCSS     | 4.1+    | Styling           |
| Redux Toolkit   | 2.8+    | State Management  |
| React Router    | 7.7+    | Navigation        |
| Axios           | 1.10+   | HTTP Client       |
| React Hook Form | 7.62+   | Form Management   |
| Zod             | 4.0+    | Schema Validation |
| Recharts        | 3.8+    | Chart Library     |

### 🚀 DevOps & Deployment

- **Containerization**: Docker & Docker Compose
- **Build**: Multi-stage Builds
- **Version Control**: Git
- **CI/CD Ready**: Docker Compose Config Included

---

## 📁 Project Structure

```
Ticket-Booking/
├── backend/                          # ASP.NET Core Web API
│   ├── Program.cs                   # Entry point & Configuration
│   ├── appsettings.json             # Default Configuration
│   ├── appsettings.Development.json # Development Configuration
│   ├── backend.csproj               # Project File
│   ├── Dockerfile                   # Docker Image Definition
│   │
│   ├── Controller/                  # API Endpoints
│   │   ├── AuthController.cs        # Authentication & Authorization
│   │   ├── MovieController.cs       # Movie Management
│   │   ├── TheaterController.cs     # Theater Management
│   │   ├── ShowtimesController.cs   # Showtime Management
│   │   ├── SeatsController.cs       # Seat Management
│   │   ├── ReservationController.cs # Reservation Operations
│   │   ├── PaymentController.cs     # Payment Processing
│   │   └── ... (other controllers)
│   │
│   ├── Model/                       # Entity Models
│   │   ├── User.cs
│   │   ├── Movie.cs
│   │   ├── Theater.cs
│   │   ├── Showtime.cs
│   │   ├── Seat.cs
│   │   ├── SeatSession.cs
│   │   ├── Reservation.cs
│   │   └── ... (other models)
│   │
│   ├── DTO/                         # Data Transfer Objects
│   │   ├── LoginDto.cs
│   │   ├── RegisterDto.cs
│   │   ├── MovieDto.cs
│   │   └── ... (other DTOs)
│   │
│   ├── Data/                        # Database Context
│   │   ├── AppDbContext.cs          # EF Core DbContext
│   │   └── Schema.sql               # Database Schema
│   │
│   ├── Service/                     # Business Logic Layer
│   │   ├── Interfaces/              # Service Interfaces
│   │   ├── Implementations/         # Service Implementations
│   │   └── Vnpay/                   # VNPAY Integration
│   │
│   ├── Middleware/
│   │   └── GlobalExceptionHandler.cs
│   │
│   ├── Extensions/
│   │   └── ServiceCollectionExtensions.cs
│   │
│   ├── Helpers/
│   │   └── ApiResponse.cs
│   │
│   └── Properties/
│       └── launchSettings.json
│
├── frontend/                        # React + Vite Application
│   ├── src/
│   │   ├── main.tsx                 # Entry Point
│   │   ├── App.tsx                  # Root Component
│   │   ├── components/              # Reusable Components
│   │   ├── pages/                   # Page Components
│   │   ├── services/                # API Services
│   │   ├── store/                   # Redux Store
│   │   ├── hooks/                   # Custom React Hooks
│   │   ├── types/                   # TypeScript Definitions
│   │   ├── utils/                   # Utility Functions
│   │   ├── assets/                  # Images, Icons, Fonts
│   │   └── styles/                  # Global Styles
│   │
│   ├── public/                      # Static Assets
│   ├── package.json                 # Dependencies
│   ├── vite.config.ts               # Vite Configuration
│   ├── tsconfig.json                # TypeScript Configuration
│   └── eslint.config.js             # ESLint Rules
│
├── mysql-init/
│   └── Schema.sql                   # Database Initialization Script
│
├── docker-compose.yml               # Multi-Container Setup
├── docker-compose.override.yml      # Development Overrides
├── Ticket-Booking.sln               # Visual Studio Solution
├── launchSettings.json              # Launch Profiles
└── README.md                        # This File

```

---

## 🚀 Setup & Installation

### ✅ System Requirements

| Requirement  | Minimum Version | Notes            |
| ------------ | --------------- | ---------------- |
| .NET SDK     | 6.0+            | Core Framework   |
| Node.js      | 18.0+           | Frontend Runtime |
| npm/yarn     | Latest          | Package Manager  |
| MySQL Server | 8.0+            | Database         |
| Redis Server | 7.0+            | Cache & Pub/Sub  |
| Git          | Latest          | Version Control  |

### 1️⃣ Clone Repository

```bash
git clone https://github.com/thanhpop/ticket_booking.git
cd Ticket-Booking
```

### 2️⃣ Database Setup

**Option A: Using MySQL Command**

```bash
mysql -u root -p < mysql-init/Schema.sql
```

### 3️⃣Configure Backend

Create or update `backend/appsettings.Development.json`:

### 4️⃣ Install Dependencies

**Backend:**

```bash
cd backend
dotnet restore
cd ..
```

**Frontend:**

```bash
cd frontend
npm install
# or yarn install
cd ..
```

---

## ▶️ Running the Application

### 🚀 Run Locally (Development)

**Terminal 1 - Backend:**

```bash
cd backend
dotnet run
```

✅ Backend: `https://localhost:5001` | `http://localhost:5000`
📚 Swagger: `https://localhost:5001/swagger`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

✅ Frontend: `http://localhost:5173`

**Terminal 3 - Redis:**

```bash
redis-server
```

✅ Redis: `localhost:6379`

## 📚 API Documentation

### 🔐 Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | User Registration |
| POST   | `/api/auth/login`    | User Login        |
| POST   | `/api/auth/refresh`  | Refresh Token     |

### 🎬 Movies

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | `/api/movie`      | Get All Movies       |
| GET    | `/api/movie/{id}` | Get Movie Details    |
| POST   | `/api/movie`      | Create Movie (Admin) |
| PUT    | `/api/movie/{id}` | Update Movie (Admin) |
| DELETE | `/api/movie/{id}` | Delete Movie (Admin) |

### 🎪 Showtimes

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| GET    | `/api/showtimes`      | Get All Showtimes       |
| GET    | `/api/showtimes/{id}` | Get Showtime Details    |
| POST   | `/api/showtimes`      | Create Showtime (Admin) |
| PUT    | `/api/showtimes/{id}` | Update Showtime (Admin) |

### 🪑 Seats

| Method | Endpoint                        | Description              |
| ------ | ------------------------------- | ------------------------ |
| GET    | `/api/seats/{showtimeId}`       | Get Seats by Showtime    |
| GET    | `/api/seatsession/{showtimeId}` | Get Realtime Seat Status |

### 🎫 Reservations

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/reservation`      | Create Reservation    |
| GET    | `/api/reservation`      | Get User Reservations |
| PUT    | `/api/reservation/{id}` | Update Reservation    |
| DELETE | `/api/reservation/{id}` | Cancel Reservation    |

### 💳 Payments

| Method | Endpoint                      | Description        |
| ------ | ----------------------------- | ------------------ |
| POST   | `/api/vnpay/createpaymenturl` | Create Payment URL |
| GET    | `/api/vnpay/callback`         | Payment Callback   |

### 📊 Dashboard & Reports

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/dashboard` | Get Dashboard Stats |
| GET    | `/api/report`    | Get Sales Report    |

---

## 🎯 Advanced Features

### 🔐 JWT Authentication

- Bearer Token Validation
- Refresh Token Mechanism
- Automatic Token Renewal
- Role-Based Authorization

### 💳 VNPAY Integration

- Sandbox Payment Gateway
- Webhook Callback Handling
- Transaction History Tracking
- Payment Status Verification

### ♻️ Redis Pub/Sub

- Realtime Seat Updates
- Broadcast to All Clients
- Concurrent Booking Prevention
- Event-Driven Architecture

### 📊 Analytics & Reporting

- Revenue Dashboard
- Ticket Sales Statistics
- Customer Analytics
- PDF Report Export

### 🛡️ Global Exception Handling

- Centralized Error Handling
- Structured API Responses
- Proper HTTP Status Codes
- Detailed Error Messages

---

## 🔧 Configuration Guide

### JWT Settings (appsettings.json)

```json
"Jwt": {
  "Key": "minimum-32-characters-secret-key",
  "Issuer": "your-app-name",
  "Audience": "your-users",
  "ExpireMinutes": 20
}
```

### CORS Policy (Program.cs)

```csharp
// Allowed Origins in Development
policy.WithOrigins(
  "http://localhost:4200",
  "https://localhost:4200"
)
```

### Redis Connection

```json
"Redis": {
  "Connection": "localhost:6379"
}
```

---

## 🐛 Troubleshooting

### ❌ MySQL Connection Error

```bash
# Check MySQL Service
mysql -u root -p -e "SELECT 1"

# Verify Connection String Format
# Server=localhost;Port=3306;Database=ticket_db;User=root;Password=xxx;
```

### ❌ Redis Connection Error

```bash
# Test Redis Connection
redis-cli ping
# Expected Output: PONG

# Start Redis if Needed
redis-server
```

### ❌ Frontend CORS Error

- Check CORS Policy in `Program.cs`
- Verify Backend URL in Frontend Config
- Check Network Tab in Browser DevTools (F12)

### ❌ JWT Token Expired

- Default Expiration: 20 Minutes
- Use Refresh Token Endpoint to Get New Token
- Update `ExpireMinutes` in `appsettings.json` to Change Duration

## 📝 Development Guidelines

### Code Style

- Use C# Naming Conventions (PascalCase for Classes, Methods)
- Use TypeScript/React Best Practices
- Follow ESLint Configuration

### Database Migrations

```bash
cd backend
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Environment Variables

- Never Commit Sensitive Data
- Use `appsettings.Development.json` for Local Config
- Use Environment Variables in Production

---

## 👥 Contributors

- **Developer**: Hoàng Minh Thành (@thanhpop)
- **Repository**: [alpha_cinema](https://github.com/thanhpop/ticket_booking)

⭐ If You Find This Project Helpful, Please Consider Giving It a Star!

</div>
