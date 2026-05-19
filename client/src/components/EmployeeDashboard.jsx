import { CalendarIcon, DollarSignIcon, FileTextIcon, ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"

const EmployeeDashboard = ({data = {}}) => {

  if (!data) {
    return <div className="text-center text-slate-500 py-12">No dashboard data available</div>
  }

  const emp = data.employee;

  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance ?? 0,
      title: "Days Present",
      subtitle: "This month",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves ?? 0,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
    },
    {
      icon: DollarSignIcon,
      value: data.latestPayslip ? `$${data.latestPayslip.netSalary?.toLocaleString()}` : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout",
    }
  ]

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Welcome, {emp?.firstName}!</h1>
        <p className="page-subtitle">
          {emp?.position} - {emp?.department || "No Department"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
        {cards.map((card) => (
          <div key={card.title} className="group dashboard-stat-card">
            <div>
              <div className="dashboard-stat-accent" />
              <p className="dashboard-stat-label">{card.title}</p>
              <p className="dashboard-stat-value">{card.value}</p>
            </div>

            <card.icon className="dashboard-stat-icon" />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/attendance" className="btn-primary text-center inline-flex items-center justify-center gap-2">
          Mark Attendance <ArrowRightIcon className="w-4 h-4" />
        </Link>

        <Link to="/leave" className="btn-secondary text-center">
          Apply for Leave
        </Link>
      </div>
    </div>
  )
}

export default EmployeeDashboard
