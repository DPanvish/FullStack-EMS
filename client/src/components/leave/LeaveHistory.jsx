import { format } from 'date-fns';
import { Check, Loader2, X } from 'lucide-react';
import { useState } from 'react'

const LeaveHistory = ({leaves, isAdmin, onUpdate}) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async(id, status) => {
    setProcessing(id);
  }

  return (
    <div className="leave-history-card">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th> }
              <th>Type</th>
              <th>Dates</th>
              <th>Reason</th>
              <th>Status</th>
              {isAdmin && <th className="text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 4} className="leave-empty">No leaves applications found</td>
              </tr>
            ) : (
              leaves.map((leave) => {

                return(
                  <tr key={leave._id || leave.id}>
                    {isAdmin && (
                      <td className="leave-employee-cell">
                        {leave.employee?.firstName} {leave.employee?.lastName}
                      </td>
                    )}

                    <td>
                      <span className="leave-type-badge">{leave.type}</span>
                    </td>

                    <td className="leave-date-cell">
                      {format(new Date(leave.startDate), "MMM dd")} - {format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </td>

                    <td className="leave-reason-cell" title={leave.reason}>
                      {leave.reason}
                    </td>

                    <td>
                      <span className={`badge ${leave.status === "APPROVED" ? "badge-success" : leave.status === "REJECTED" ? "badge-danger" : "badge-warning"}`}>
                        {leave.status}
                      </span>
                    </td>

                    {isAdmin && (
                      <td>
                        {leave.status === "PENDING" && (
                          <div className="leave-actions">
                            <button
                              onClick={() => handleStatusUpdate(leave._id || leave.id, "APPROVED")}
                              disabled={!!processing}
                              className="leave-approve-button"
                            >
                              {processing === (leave._id || leave.id) ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            </button>

                            <button
                              onClick={() => handleStatusUpdate(leave._id || leave.id, "REJECTED")}
                              disabled={!!processing}
                              className="leave-reject-button"
                            >
                              {processing === (leave._id || leave.id) ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                            </button>
                          </div>
                        )}
                      </td>
                    )}
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

export default LeaveHistory
