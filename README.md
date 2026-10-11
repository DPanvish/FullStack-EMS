# QuickEMS — Enterprise Employee Management System

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Inngest](https://img.shields.io/badge/Inngest-Workflows-000000?logo=inngest&logoColor=white)](https://www.inngest.com/)

**QuickEMS** is an enterprise-grade full-stack human resource management platform designed for modern organizations. Built with React 19, Express 5, and MongoDB, it features role-based access control, server-side HTTP-Only cookie security, automated serverless workflow orchestration, and an asynchronous data architecture powered by TanStack Query.

---

## 📑 Table of Contents
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Security & Engineering Hardening](#-security--engineering-hardening)
- [Project Structure](#-project-structure)
- [Quick Start & Installation](#-quick-start--installation)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Background Workflows (Inngest)](#-background-workflows-inngest)
- [License](#-license)

---

## ✨ Key Features

### 👤 Role-Based Portals (Admin & Employee)
- **Admin Portal**: Complete employee directory with CRUD operations, department filters, live payroll generation, leave approvals/rejections, and high-level company analytics.
- **Employee Portal**: Daily clock-in/out tracking, live work hour calculation, leave request submissions, payslip downloads, and personal profile updates.

### ⚡ TanStack Query Integration
- Asynchronous client-state management across all pages.
- Automatic background caching, query deduplication, and declarative loading/error states.
- Unified cache invalidation across mutations (e.g. updating a profile instantly reflects across the Sidebar and Settings simultaneously).

### ⏰ Attendance & Time Tracking
- Real-time work shift tracking calculating full-day, three-quarter-day, half-day, and short-day hours.
- Automated Inngest background event triggers that remind employees to clock out and mark auto-checkout after shift limits.
- Daily 11:30 AM cron job scanning for absent employees and dispatching email notifications.

### 📝 Leave Management
- Multi-category leave requests (`SICK`, `CASUAL`, `ANNUAL`) with future-date validation.
- Real-time status tracking (`PENDING`, `APPROVED`, `REJECTED`).
- Automated 24-hour reminder email dispatch to admins for unattended leave applications.

### 💵 Payroll & Digital Payslips
- Instant monthly payslip generation with automatic salary/allowance/deduction autofill based on employee contracts.
- Duplicate payslip prevention for identical billing cycles.
- Dedicated print-optimized payslip layout for PDF generation and physical printing.

---

## 🛠️ Architecture & Tech Stack

```
   ┌─────────────────────────────────────────────────────────────┐
   │                    QuickEMS Frontend                        │
   │  React 19 • Vite 8 • Tailwind CSS 4 • TanStack Query v5     │
   └───────────────▲─────────────────────────────┬───────────────┘
                   │ Credentials: true (Cookies) │
                   │ HTTP-Only Auth Token        │
   ┌───────────────┴─────────────────────────────▼───────────────┐
   │                    QuickEMS API Server                      │
   │   Express 5 • Mongoose 9 • Cookie-Parser • Multer           │
   └───────────────┬─────────────────────────────┬───────────────┘
                   │                             │
                   ▼                             ▼
   ┌─────────────────────────────┐ ┌─────────────────────────────┐
   │       MongoDB Atlas         │ │     Inngest Serverless      │
   │  Employees, Users, Leaves,  │ │  Shift Monitors, Reminders, │
   │    Attendance, Payslips     │ │       Daily Cron Jobs       │
   └─────────────────────────────┘ └─────────────────────────────┘
```

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, TanStack Query v5, Tailwind CSS v4, Lucide Icons, Date-fns, React Hot Toast |
| **Backend** | Node.js, Express 5, Cookie-Parser, Multer, Bcrypt, JsonWebToken |
| **Database** | MongoDB Atlas with Mongoose 9 ODM |
| **Workflows & Cron** | Inngest Cloud / Dev Server |
| **Email Service** | Nodemailer with Brevo (SMTP Relay) |

---

## 🛡️ Security & Engineering Hardening

1. **HTTP-Only & Secure Cookies**:
   - Replaced vulnerable `localStorage` tokens with `httpOnly`, `SameSite: lax`/`none`, and `Secure` cookies to protect against Cross-Site Scripting (XSS) token exfiltration.
2. **CORS Credentials Protection**:
   - Configured origin matching with `credentials: true` preventing unauthorized cross-origin requests.
3. **IDOR & Authorization Protection**:
   - Explicit object-level access control on `GET /api/payslips/:id` ensuring employees can only inspect their own financial records.
4. **Data Integrity & Rollback**:
   - Sequential user and employee account creation is wrapped in automated rollback handlers to prevent orphaned records in MongoDB.
   - Unique compound indexes preventing duplicate monthly payslips per employee.

---

## 📁 Project Structure

```text
ems/
├── client/                     # Frontend Application (React + Vite)
│   ├── api/                    # Axios API client with credentials interceptors
│   ├── context/                # Authentication context powered by TanStack Query
│   ├── public/                 # Static assets (Favicon SVG)
│   └── src/
│       ├── assets/             # Department constants and presentation helpers
│       ├── components/         # Modular UI components (Modals, Cards, Sidebar, Logo)
│       ├── pages/              # Primary route views (Dashboard, Attendance, Leave, etc.)
│       ├── App.jsx             # Route definitions and layout wrappers
│       ├── index.css           # Custom theme tokens and Tailwind styling
│       └── main.jsx            # QueryClientProvider & BrowserRouter mounting
│
├── server/                     # Backend Application (Express + Node)
│   ├── config/                 # Database and Nodemailer transporter configuration
│   ├── constants/              # System-wide enum values (Departments, Roles)
│   ├── controllers/            # Controller business logic
│   ├── inngest/                # Scheduled cron jobs and event-driven functions
│   ├── middleware/             # Cookie token authentication and role guards
│   ├── models/                 # Mongoose schemas (User, Employee, Attendance, etc.)
│   ├── routes/                 # Express route definitions
│   ├── seed.js                 # Initial admin account seeder
│   └── server.js               # Application entry point
│
├── README.md                   # Repository documentation
└── setup.txt                   # Quick installation reference
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)
- MongoDB Connection URI (Local or MongoDB Atlas)

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ems.git
cd ems
```

---

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in `server/` (refer to `.env.example`):
```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ems
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=admin@example.com
CLIENT_URL=http://localhost:5173

# Optional: Inngest & Email
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_signing_key
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
SENDER_EMAIL=notifications@yourdomain.com
```

Seed the default administrator account:
```bash
npm run seed
```
> Default Admin credentials: `admin@example.com` / `admin@123`

Start the server:
```bash
npm run dev
```

---

### 3. Frontend Setup
In a new terminal:
```bash
cd client
npm install
```

Create a `.env` file in `client/`:
```env
VITE_BASE_URL=http://localhost:4000
```

Start the Vite development server:
```bash
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🔑 Environment Variables

### Server (`server/.env`)
| Variable | Description | Required |
|---|---|:---:|
| `PORT` | Port for the backend API (Default: `4000`) | No |
| `MONGODB_URI` | MongoDB connection string | **Yes** |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens | **Yes** |
| `ADMIN_EMAIL` | Default system administrator email | **Yes** |
| `CLIENT_URL` | Allowed frontend origin for CORS | **Yes** |
| `SMTP_USER` | SMTP username for Nodemailer | Optional |
| `SMTP_PASS` | SMTP password for Nodemailer | Optional |
| `SENDER_EMAIL` | Outgoing notification email address | Optional |
| `INNGEST_EVENT_KEY` | Inngest event dispatch key | Optional |
| `INNGEST_SIGNING_KEY`| Inngest webhook signature validation key | Optional |

### Client (`client/.env`)
| Variable | Description | Required |
|---|---|:---:|
| `VITE_BASE_URL` | Base endpoint URL of the backend API | **Yes** |

---

## 📡 API Reference

### Authentication (`/api/auth`)
- `POST /api/auth/login` — Authenticate user and assign HTTP-Only cookie.
- `POST /api/auth/logout` — Clear session cookie.
- `GET /api/auth/session` — Retrieve active user session.
- `POST /api/auth/change-password` — Update user account password.

### Employees (`/api/employees`)
- `GET /api/employees` — List all employees (Admin only, supports `?department=`).
- `POST /api/employees` — Create user and employee profile (Admin only).
- `PUT /api/employees/:id` — Update employee details (Admin only).
- `DELETE /api/employees/:id` — Soft-delete employee account (Admin only).

### Attendance (`/api/attendance`)
- `GET /api/attendance` — Fetch personal attendance history.
- `POST /api/attendance` — Clock in or clock out for today.

### Leaves (`/api/leave`)
- `GET /api/leave` — Fetch leave records (Admin: all; Employee: own).
- `POST /api/leave` — Submit a new leave request.
- `PATCH /api/leave/:id` — Approve or reject a leave request (Admin only).

### Payslips (`/api/payslips`)
- `GET /api/payslips` — List payslips (Admin: all; Employee: own).
- `POST /api/payslips` — Generate a monthly payslip (Admin only).
- `GET /api/payslips/:id` — Detailed payslip view (Authorized employee or Admin).

### Dashboard (`/api/dashboard`)
- `GET /api/dashboard` — Fetch role-specific dashboard metrics and metrics summary.

---

## ⚡ Background Workflows (Inngest)

The application utilizes [Inngest](https://www.inngest.com/) for durable, distributed event-driven workflows:

1. **`employee/check-out`**:
   - Triggers upon employee clock-in.
   - Sleeps for 9 hours. If the user hasn't clocked out, sends an email alert.
   - After 10 hours, automatically records check-out with status `LATE`.
2. **`leave/pending`**:
   - Triggers upon leave application submission.
   - Sleeps for 24 hours. If still pending, sends an escalation reminder to the admin.
3. **`attendance-reminder-cron`**:
   - Cron scheduled every weekday at 11:30 AM IST (`TZ=Asia/Kolkata 10 11 * * *`).
   - Identifies active employees who have not clocked in and are not on approved leave, sending reminder emails.

To run Inngest locally with the Express server:
```bash
npx inngest-cli@latest dev -u http://localhost:4000/api/inngest
```

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).
