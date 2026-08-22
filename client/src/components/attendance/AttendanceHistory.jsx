import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets"
import {format} from "date-fns"


const AttendanceHistory = ({history}) => {
  return (
    <div className="attendance-history-card">
      <div className="attendance-history-header">
        <h3 className="attendance-history-title">Recent Activity</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
              <th className="px-6 py-4">Working Hours</th>
              <th className="px-6 py-4">Day Type</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={6} className="attendance-empty">No records found</td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record)

                return(
                  <tr key={record._id || record.id}>
                    <td className="attendance-date-cell">
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </td>

                    <td className="attendance-text-cell">
                      {record.checkIn ? format(new Date(record.checkIn), "hh:mm a") : "-"}
                    </td>

                    <td className="attendance-text-cell">
                      {record.checkOut ? format(new Date(record.checkOut), "hh:mm a") : "-"}
                    </td>

                    <td className="attendance-strong-cell">
                      {getWorkingHoursDisplay(record)}
                    </td>

                    <td className="px-6 py-4">
                      {dayType.label !== "-" ? <span className={`badge ${dayType.className}`}>{dayType.label}</span>: "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`badge ${record.status === "PRESENT" ? "badge-success" : record.status === "LATE" ? "badge-warning" : " "}`}>{record.status}</span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendanceHistory
