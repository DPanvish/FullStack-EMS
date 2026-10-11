import { CalendarDays, FileText, Loader2, Send, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/api";
import toast from "react-hot-toast";

const ApplyLeaveModal = ({open, onClose, onSuccess}) => {
  const queryClient = useQueryClient();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const applyMutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/leave", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Leave application submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      onSuccess?.();
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || error?.message);
    },
  });

  const loading = applyMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    applyMutation.mutate(data);
  }
  
  if(!open){
    return null;
  }

  return (
    <div className="leave-modal-backdrop" onClick={onClose}>
      <div className="leave-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="leave-modal-title">Apply for Leave</h2>
            <p className="leave-modal-subtitle">Submit your leave request for approval</p>
          </div>
          <button
            onClick={onClose}
            className="leave-modal-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="leave-form-label">
              <FileText className="leave-form-icon" />
              Leave Type
            </label>
            <select name="type" required>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>

          <div>
            <label className="leave-form-label">
              <CalendarDays className="leave-form-icon" /> Duration
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="leave-form-helper">From</span>
                <input type="date" name="startDate" required min={minDate} />
              </div>
              <div>
                <span className="leave-form-helper">To</span>
                <input type="date" name="endDate" required min={minDate} />
              </div>
            </div>
          </div>

          <div>
            <label className="leave-reason-label">
              Reason
            </label>
            <textarea name="reason" required rows={3} className="resize-none" placeholder="Briefly describe why you need this leave..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              type="button"
              className="btn-secondary flex-1"
            >
              Cancel
            </button>

            <button 
              disabled={loading}
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyLeaveModal
