# Employee Management System (EMS)

Employee Management System is a full-stack HR management project with a React client and an Express/MongoDB API. It supports separate admin and employee entry points, dashboard views, employee records, attendance, leave requests, payslips, profile settings, and email-backed workflow events.

## Features

- Admin and employee login flows.
- Dashboard summaries for HR and employee activity.
- Employee directory with create, update, view, and delete operations.
- Attendance check-in/check-out tracking.
- Leave application submission and admin status updates.
- Payslip creation, listing, detail lookup, and printable payslip views.
- Profile and password management.
- Inngest and Nodemailer integration for background/email workflows.

## Tech Stack

### Client

- React 19
- Vite 8
- Tailwind CSS 4 through `@tailwindcss/vite`
- React Router / React Router DOM
- Lucide React
- React Hot Toast
- date-fns

### Server

- Node.js with Express 5
- MongoDB with Mongoose
- JSON Web Tokens for authentication
- bcrypt for password hashing
- multer for form parsing
- Nodemailer with Brevo SMTP settings
- Inngest for background functions

## Project Structure

```text
ems/
|-- README.md
|-- setup.txt
|-- client/
|   |-- package.json
|   |-- vite.config.js
|   |-- index.html
|   |-- public/
|   `-- src/
|       |-- App.jsx
|       |-- main.jsx
|       |-- index.css
|       |-- assets/
|       |-- components/
|       `-- pages/
`-- server/
    |-- package.json
    |-- server.js
    |-- seed.js
    |-- config/
    |-- constants/
    |-- controllers/
    |-- inngest/
    |-- middleware/
    |-- models/
    `-- routes/
```

## Prerequisites

- Node.js 18 or newer.
- npm, included with Node.js.
- A MongoDB connection string.
- SMTP credentials if email delivery is required.

## Environment Variables

Create `server/.env` with values for your environment:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>
JWT_SECRET=<strong-random-secret>
ADMIN_EMAIL=admin@example.com

SMTP_USER=<smtp-user>
SMTP_PASS=<smtp-password>
SENDER_EMAIL=<sender-email>

INNGEST_EVENT_KEY=<inngest-event-key>
INNGEST_SIGNING_KEY=<inngest-signing-key>
```

Do not commit real secrets. The server code reads `JWT_SECRET`; make sure the variable name is spelled exactly that way.

## Installation

Install client dependencies:

```bash
cd client
npm install
```

Install server dependencies:

```bash
cd ../server
npm install
```

## Running Locally

Start the API server:

```bash
cd server
npm run dev
```

The API runs on `http://localhost:4000/` by default.

Start the client in another terminal:

```bash
cd client
npm run dev
```

Vite runs the client at `http://localhost:5173/` by default. If the port is already in use, Vite prints the alternate local URL.

## Seeding the Admin User

After configuring `server/.env`, create the first admin account:

```bash
cd server
npm run seed
```

The seed script uses `ADMIN_EMAIL` and creates a temporary password of `admin@123`. Change the password after first login.

## Client Scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Build the client for production
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Server Scripts

```bash
npm run dev    # Start the API with nodemon
npm start      # Start the API with node
npm run seed   # Create the initial admin user
```

## Client Routes

- `/login` - choose Admin or Employee login.
- `/login/admin` - Admin portal login.
- `/login/employee` - Employee portal login.
- `/dashboard` - main dashboard.
- `/employees` - employee management.
- `/attendance` - attendance tracking.
- `/leave` - leave management.
- `/payslips` - payslip management.
- `/settings` - profile and settings.
- `/print/payslips/:id` - printable payslip view.

## API Routes

- `GET /` - server health message.
- `/api/auth` - login, session, and password routes.
- `/api/employees` - employee management routes.
- `/api/profile` - profile read/update routes.
- `/api/attendance` - attendance routes.
- `/api/leave` - leave application routes.
- `/api/payslips` - payslip routes.
- `/api/dashboard` - dashboard data route.
- `/api/inngest` - Inngest function endpoint.

## Notes

The React client currently keeps sample HR data in the application layer while the Express API provides the backend routes and database models. Wire the client pages to the API when moving from mock data to live data.
