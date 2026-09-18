import { Loader2, Save, User } from "lucide-react";
import { useState } from "react"

const ProfileForm = ({initialData, onSuccess}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit} className="settings-profile-card">
      <h2 className="settings-section-title">
        <User className="settings-section-icon" /> Public Profile
      </h2>

      {error && (
        <div className="settings-alert-error">
          <div className="settings-alert-error-dot" /> {error}
        </div>
      )}

      {message && (
        <div className="settings-alert-success">
          <div className="settings-alert-success-dot" /> {message}
        </div>
      )}

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="settings-form-label">Name</label>
            <input disabled value={`${initialData.firstName} ${initialData.lastName}`} className="settings-disabled-input" />
          </div>

          <div>
            <label className="settings-form-label">Email</label>
            <input disabled value={initialData.email} className="settings-disabled-input" />
          </div>

          <div className="sm:col-span-2">
            <label className="settings-form-label">Position</label>
            <input disabled value={initialData.position} className="settings-disabled-input" />
          </div>
        </div>

        <div>
          <label className="settings-form-label">Bio</label>
          <textarea disabled={initialData.isDeleted} name="bio" defaultValue={initialData.bio || ""} placeholder="Write a brief bio.." className={`resize-none ${initialData.isDeleted ? "settings-disabled-input" : ""}`} />
          <p className="settings-helper">This will be displayed on your profile.</p>
        </div>

        {initialData.isDeleted ? (
          <div className="pt-2">
            <div className="settings-deactivated">
              <p className="settings-deactivated-title">Account Deactivated</p>
              <p className="settings-deactivated-text">You can no longer update your profile.</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 justify-center w-full sm:w-auto">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default ProfileForm
