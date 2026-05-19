import { Building2Icon, CalendarIcon, FileTextIcon, UsersIcon } from "lucide-react";

const AdminDashboard = ({data = {}}) => {
  if (!data) {
    return <div className="text-center text-slate-500 py-12">No dashboard data available</div>
  }

  const stats = [
    {
      icon: UsersIcon,
      value: data.totalEmployees ?? 0,
      label: "Total Employees",
      description: "Active workforce",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Total Departments",
      description: "Organization units",
    },
    {
      icon: CalendarIcon,
      value: data.todayAttendance,
      label: "Today's Attendance",
      description: "Checked in today",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: "Pending Leaves",
      description: "Awaiting approval",
    }
  ]

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back, Admin - here's your overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="group dashboard-stat-card">
            <div>
              <div className="dashboard-stat-accent" />
              <p className="dashboard-stat-label">{stat.label}</p>
              <p className="dashboard-stat-value">{stat.value}</p>
            </div>

            <stat.icon className="dashboard-stat-icon" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
