import { Loader2Icon, LockIcon, X } from "lucide-react";
import { useState } from "react"
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";

const ChangePasswordModal = ({open, onClose}) => {
  const [message, setMessage] = useState({type: "", text: ""});
  
  const changePasswordMutation = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const { data } = await api.post("/auth/change-password", { currentPassword, newPassword });
      if(!data.success){
        throw new Error(data.error || "Failed");
      }
      return data;
    },
    onSuccess: () => {
      setMessage({ type: "success", text: "Password updated successfully" });
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.response?.data?.error || error.message });
    },
  });

  const loading = changePasswordMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({type: "", text: ""});
    const form = e.currentTarget;
    const formData = new FormData(form);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    changePasswordMutation.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  }

  if(!open){
    return null;
  }

  return (
    <div onClick={onClose} className="settings-modal-shell">
      <div className="settings-modal-backdrop" />

      <div className="settings-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="settings-modal-title">
            <LockIcon className="settings-section-icon" /> Change Password
          </h2>
          <button onClick={onClose} className="settings-modal-close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          {message.text && (
            <div className={message.type === "success" ? "settings-modal-message-success" : "settings-modal-message-error"}>
              <div className={message.type === "success" ? "settings-alert-success-dot" : "settings-alert-error-dot"}/>
              {message.text}
            </div>
          )}

          <div>
            <label className="settings-form-label">Current Password</label>
            <input type="password" name="currentPassword" required placeholder="••••••••" />
          </div>

          <div>
            <label className="settings-form-label">New Password</label>
            <input type="password" name="newPassword" required placeholder="••••••••" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              type="button"
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="btn-primary flex items-center"
            >
              {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal
