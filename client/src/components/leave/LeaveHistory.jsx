import { format } from 'date-fns';
import { Check, Loader2, X } from 'lucide-react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from '../../../api/api';
import toast from 'react-hot-toast';

const LeaveHistory = ({leaves, isAdmin, onUpdate}) => {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await api.patch(`/leave/${id}`, { status });
      return res.data;
    },
    onSuccess: (_, { status }) => {
      toast.success(`Leave request ${status.toLowerCase()} successfully`);
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      onUpdate?.();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || error.message);
    },
  });

  const handleStatusUpdate = (id, status) => {
    updateStatusMutation.mutate({ id, status });
  }

  const isProcessingId = (id) => updateStatusMutation.isPending && updateStatusMutation.variables?.id === id;

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
                const leaveId = leave._id || leave.id;
                const processing = isProcessingId(leaveId);

                return(
                  <tr key={leaveId}>
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
                              onClick={() => handleStatusUpdate(leaveId, "APPROVED")}
                              disabled={updateStatusMutation.isPending}
                              className="leave-approve-button"
                            >
                              {processing && updateStatusMutation.variables?.status === "APPROVED" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>

                            <button
                              onClick={() => handleStatusUpdate(leaveId, "REJECTED")}
                              disabled={updateStatusMutation.isPending}
                              className="leave-reject-button"
                            >
                              {processing && updateStatusMutation.variables?.status === "REJECTED" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
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
