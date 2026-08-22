import { AlertCircleIcon, CalendarIcon, ClockIcon } from "lucide-react";


const AttendanceStats = ({history}) => {
  const totalPresent = history.filter((h) => h.status === "PRESENT" | h.status === "LATE").length;
  const totalLate = history.filter((h) => h.status === "LATE").length;

  const stats = [
    {
      label: "Days Present",
      value: totalPresent,
      icon: CalendarIcon
    },
    {
      label: "Late Arrivals",
      value: totalLate,
      icon: AlertCircleIcon
    },
    {
      label: "Avg. Work Hrs",
      value: "8.5 Hrs",
      icon: ClockIcon
    }
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="group attendance-stat-card">
          <div className="attendance-stat-accent"/>
          <div className="attendance-stat-icon-box">
            <s.icon className="attendance-stat-icon" />
          </div>
          <div>
            <p className="attendance-stat-label">{s.label}</p>
            <p className="attendance-stat-value">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AttendanceStats
