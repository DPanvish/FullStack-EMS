# QuickEMS Frontend Client

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

The **QuickEMS Client** is a high-performance Single Page Application (SPA) built with React 19, Vite 8, Tailwind CSS 4, and TanStack Query v5. It provides dedicated role-based portals for organization Administrators and Employees with a unified luxury dark aesthetic.

---

## 🎨 Visual Identity & Brand Design

- **Palette**: Deep corporate midnight navy (`#030812`, `#0a1120`, `#101b2d`) paired with metallic champagne gold accents (`#c5a76a`, `#ebe3d1`).
- **Brand Mark**: Precision geometric emblem featuring an apex diamond crown and angular monogram, accessible via `<Logo />` and `<LogoIcon />` components.
- **Micro-Interactions**: Smooth hover elevations, glassmorphic backdrop filters, and subtle golden ring highlights.

---

## ⚡ Architecture & State Management

### 1. TanStack Query v5
All server data fetching, mutations, and caching are managed asynchronously through TanStack Query:
- **Deduplication & Background Refetching**: Automatic stale-time management and window refocus synchronization.
- **Optimistic Sync & Cache Invalidation**: Coordinated query keys (`['session']`, `['employees']`, `['attendance']`, `['leaves']`, `['payslips']`, `['dashboard']`) ensure instant UI consistency across components upon mutation.

### 2. Cookie-Based Authentication
- Communicates with the Express backend using `withCredentials: true` via an Axios instance (`api.js`).
- Session validation is driven by `useQuery` fetching `GET /api/auth/session` on initial load, restoring authenticated user contexts with zero client-side token exposure.
- Fully protected against token theft (XSS) by eliminating `localStorage` JWT storage.

---

## 📁 Directory Structure

```
client/src/
├── api/
│   └── api.js              # Centralized Axios instance withCredentials configuration
├── assets/
│   └── assets.jsx          # UI asset constants and fallback configurations
├── components/
│   ├── Logo.jsx            # Reusable SVG brand mark and typography
│   ├── Navbar.jsx          # Sticky header with breadcrumbs and user actions
│   ├── Sidebar.jsx         # Collapsible navigation drawer with role-based routing
│   ├── Modal.jsx           # Generic accessible backdrop modal
│   ├── AddEmployeeModal.jsx# Multi-step employee onboarding modal
│   ├── ApplyLeaveModal.jsx # Leave application submission dialog
│   └── LoginLeftSide.jsx   # Premium branded authentication hero section
├── context/
│   └── AppContext.jsx      # Global context for modals and lightweight client preferences
├── pages/
│   ├── Login.jsx           # Unified dual-role login gateway
│   ├── Dashboard.jsx       # Real-time workforce metrics and high-level charts
│   ├── Employees.jsx       # Employee directory with search, filter, and management
│   ├── Attendance.jsx      # Clock-in/out console and monthly timecard table
│   ├── Leave.jsx           # Leave management, approval workflow, and balance cards
│   ├── Payslips.jsx        # Payroll distribution and payslip history
│   ├── PrintPayslip.jsx    # Print-optimized, branded payslip document view
│   └── Settings.jsx        # Profile management and password updates
├── App.jsx                 # Route definitions and session guards
├── index.css               # Tailwind CSS 4 theme imports and custom utilities
└── main.jsx                # Application root with QueryClientProvider & BrowserRouter
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.x` or higher
- Running instance of QuickEMS Backend API (`http://localhost:4000`)

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `client/` root (or copy `.env.example`):
```bash
cp .env.example .env
```

Ensure `VITE_BASE_URL` points to your active backend:
```env
VITE_BASE_URL=http://localhost:4000
```

### 3. Development Server
```bash
npm run dev
```
The client will launch at `http://localhost:5173/`.

---

## 🛠️ Build & Tooling Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Starts the Vite development server with Hot Module Replacement |
| `npm run build` | Compiles and optimizes assets into production-ready `dist/` |
| `npm run preview` | Locally serves the production build for smoke testing |
| `npm run lint` | Runs ESLint against JavaScript and JSX files |

---

## 🔒 Security Best Practices

- **Zero Token Storage**: Tokens are strictly handled via `httpOnly` cookies set by the server. No JWTs or sensitive user credentials are saved in `localStorage` or `sessionStorage`.
- **Protected Routing**: Navigation guards intercept unauthenticated sessions and redirect users to `/login`.
- **Role Verification**: Admin-specific actions (e.g. employee creation, leave approvals) are conditionally rendered on the frontend and validated by server middleware.
