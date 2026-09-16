# Employee Management System (EMS)

A frontend Employee Management System for HR workflows. The app provides separate admin and employee login paths, dashboard views, employee records, attendance tracking, leave management, payslip generation, and organization settings.

## Features

- Role-based entry points for Admin and Employee portals.
- Dashboard overview for core HR metrics and activity.
- Employee directory with add, edit, view, and delete flows.
- Attendance check-in/check-out tracking with history and stats.
- Leave request submission, review, approval, and rejection.
- Payslip generation, listing, and printable payslip pages.
- Settings screens for organization and user preferences.

## Tech Stack

- React 19 for the UI.
- Vite 8 for local development and production builds.
- Tailwind CSS 4 through the Vite plugin.
- React Router DOM 7 for client-side routing.
- Lucide React for icons.
- React Hot Toast for notifications.
- date-fns for date formatting and date utilities.

## Getting Started

### Prerequisites

- Node.js 18 or newer.
- npm, which is included with Node.js.

### Installation

```bash
git clone <repository-url>
cd ems/client
npm install
```

### Development

```bash
npm run dev
```

Vite starts the app at `http://localhost:5173/` by default. If that port is already in use, Vite prints the alternate local URL in the terminal.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routes

- `/login` - choose Admin or Employee login.
- `/login/admin` - Admin portal login.
- `/login/employee` - Employee portal login.
- `/dashboard` - main dashboard.
- `/employees` - employee management.
- `/attendance` - attendance tracking.
- `/leave` - leave management.
- `/payslips` - payslip management.
- `/settings` - settings.
- `/print/payslips/:id` - printable payslip view.

## Project Structure

```text
ems/
|-- README.md
|-- setup.txt
`-- client/
    |-- package.json
    |-- vite.config.js
    |-- index.html
    |-- public/
    |   |-- favicon.svg
    |   `-- icons.svg
    `-- src/
        |-- App.jsx
        |-- main.jsx
        |-- index.css
        |-- assets/
        |-- components/
        `-- pages/
```

## Notes

This repository currently contains the frontend client. Data handling is implemented in the React application layer; add API configuration notes here if a backend service is connected later.
