# FullStack Employee Management System (EMS)

A comprehensive Employee Management System built to streamline HR operations, track attendance, manage leave requests, and generate payslips. This system features role-based access for both Administrators and Employees.

## Features

- **Role-Based Authentication:** Separate portals for Admins and Employees.
- **Dashboard:** Overview of key metrics and recent activities.
- **Employee Management:** Add, view, update, and remove employee records.
- **Attendance Tracking:** Monitor and manage daily employee attendance.
- **Leave Management:** Submit, review, and approve/reject leave requests.
- **Payslips:** Generate, view, and print employee payslips.
- **Settings:** Customize organization and user preferences.

## Tech Stack

**Frontend:**
- [React](https://react.dev/) (v19) - Core UI library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) (v4) - Utility-first styling framework
- [React Router DOM](https://reactrouter.com/) - Client-side routing
- [Lucide React](https://lucide.dev/) - Icon library
- [React Hot Toast](https://react-hot-toast.com/) - Toast notifications

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ems
   ```

2. **Setup the Frontend (Client):**
   ```bash
   cd client
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

The application should now be running on `http://localhost:5173/` (or the port specified by Vite).

## Project Structure

```
ems/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application routes/pages
│   │   ├── App.jsx         # Main application routing
│   │   └── main.jsx        # Application entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
└── setup.txt               # Initial setup logs and commands
```
