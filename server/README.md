# QuickEMS Backend API Server

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Inngest](https://img.shields.io/badge/Inngest-Workflows-000000?logo=inngest&logoColor=white)](https://www.inngest.com/)

The **QuickEMS Backend** is an enterprise-grade RESTful API built on Express 5, Mongoose 9, and Inngest. It provides secure authentication, comprehensive employee records management, real-time attendance calculations, leave workflows, and automated payroll services.

---

## 🏗️ Architecture & Core Components

```
server/
├── config/
│   ├── db.js                 # MongoDB connection using Mongoose
│   ├── inngest.js            # Inngest client initialization
│   └── nodemailer.js         # Nodemailer SMTP transport setup
├── controllers/
│   ├── auth.controller.js    # Login, logout, session verification, password change
│   ├── employee.controller.js# Employee CRUD operations and user account provisioning
│   ├── attendance.controller.js# Clock-in/out, live shift duration, and monthly logs
│   ├── leave.controller.js   # Leave requests, status transitions (Approve/Reject)
│   ├── payslip.controller.js # Automated payroll generation and individual paystubs
│   ├── profile.controller.js # Current user profile retrieval and modification
│   └── dashboard.controller.js # Aggregated analytics and organizational summaries
├── inngest/
│   └── functions.js          # Scheduled crons, clock-out alerts & auto-checkout jobs
├── middleware/
│   ├── auth.middleware.js    # JWT verification from HTTP-Only cookies & role guards
│   └── multer.middleware.js  # File upload configuration for profile images
├── models/
│   ├── user.model.js         # User credentials, role (Admin/Employee), active flag
│   ├── employee.model.js     # Extended employee details (salary, department, contact)
│   ├── attendance.model.js   # Daily clock-in/out stamps, duration, and status
│   ├── leave.model.js        # Leave applications, type, dates, reason, approval status
│   └── payslip.model.js      # Monthly salary breakdown, deductions, and payment status
├── routes/
│   ├── auth.routes.js        # Authentication endpoints
│   ├── employee.routes.js    # Employee administration routes
│   ├── attendance.routes.js  # Attendance routes
│   ├── leave.routes.js       # Leave management routes
│   ├── payslip.routes.js     # Payroll routes
│   ├── profile.routes.js     # User profile routes
│   └── dashboard.routes.js   # Dashboard statistics routes
├── seed.js                   # Administrator provisioning seed script
└── server.js                 # Express application initialization and middleware
```

---

## 🔐 Security Engineering

1. **HTTP-Only Cookies**:
   Authentication tokens (`token`) are delivered and transmitted via HTTP-Only, `SameSite: lax`/`none` cookies. JavaScript cannot access tokens, preventing credential theft via XSS.
2. **CORS Hardening**:
   Configured with explicit client origin authorization and `credentials: true`.
3. **IDOR & Authorization Guards**:
   All endpoints enforce strict role checks (`protectRoute`, `adminOnly`) and object-level permissions (e.g. employees can only access their own payslips).
4. **Data Isolation & Rollbacks**:
   Employee creation automatically cleans up the corresponding authentication user record if any subsequent step encounters an error.

---

## 🚀 Getting Started

### 1. Installation
```bash
cd server
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Provide values for your environment:
```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ems
JWT_SECRET=super_secret_jwt_key_at_least_32_characters_long
ADMIN_EMAIL=admin@example.com

# SMTP configuration for email delivery
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SENDER_EMAIL="QuickEMS <noreply@yourdomain.com>"

# Inngest (leave blank for local dev)
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

### 3. Provision Initial Admin
```bash
npm run seed
```
Creates a default administrator with `admin@example.com` and initial password `admin@123`.

### 4. Run the Server
```bash
npm run dev     # Development mode with Nodemon
# or
npm start       # Production startup
```

---

## ⚡ Background Tasks (Inngest)

QuickEMS leverages Inngest for event-driven orchestration:
- **Auto-Checkout Workflow**: Calculates shift limits and marks checkout if an employee forgets to clock out.
- **Clock-Out Reminders**: Dispatches an email reminder 30 minutes before end of shift.
- **Morning Absentee Audit**: Daily cron job running at 11:30 AM scanning for unmarked attendance and dispatching notifications.
- **Admin Leave Alerts**: Sends reminder notifications to managers for pending leave requests awaiting approval after 24 hours.

Run Inngest locally with:
```bash
npx inngest-cli@latest dev -u http://localhost:4000/api/inngest
```

---

## 📡 Key REST Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Authenticates user and sets HTTP-Only token cookie |
| `POST` | `/api/auth/logout` | Authenticated | Clears authentication cookie |
| `GET` | `/api/auth/session` | Authenticated | Returns current authenticated user profile |
| `GET` | `/api/dashboard` | Authenticated | Workforce analytics and summary metrics |
| `GET` | `/api/employees` | Admin | Retrieves all organization employees |
| `POST` | `/api/employees` | Admin | Provisions new employee profile & user credentials |
| `GET` | `/api/attendance` | Authenticated | Returns attendance history (self or all if admin) |
| `POST` | `/api/attendance/clock-in` | Employee | Records clock-in timestamp |
| `POST` | `/api/attendance/clock-out` | Employee | Records clock-out timestamp and computes hours |
| `GET` | `/api/leave` | Authenticated | Fetches leave applications |
| `POST` | `/api/leave` | Employee | Submits a new leave request |
| `PATCH` | `/api/leave/:id/status` | Admin | Approves or rejects a pending leave request |
| `GET` | `/api/payslips` | Authenticated | Fetches payslip records |
| `POST` | `/api/payslips` | Admin | Generates monthly payslip for an employee |
| `ALL` | `/api/inngest` | Public / Inngest | Serves Inngest functions and event webhooks |

