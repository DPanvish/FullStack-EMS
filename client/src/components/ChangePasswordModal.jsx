import { Loader2Icon, LockIcon, X } from "lucide-react";
import { useState } from "react"


const ChangePasswordModal = ({open, onClose}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({type: "", text: ""});
  
  const handleSubmit = async(e) => {
    e.preventDefault();
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
            <input type="password" name="currentPassword" required/>
          </div>

          <div>
            <label className="settings-form-label">New Password</label>
            <input type="password" name="newPassword" required />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 flex justify-center items-center gap-2">
              {loading && <Loader2Icon className="w-4 h-4 animate-spin" />}
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal
