import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import Loading  from "../components/Loading"
import { Lock } from "lucide-react"
import ProfileForm from "../components/ProfileForm"
import ChangePasswordModal from "../components/ChangePasswordModal"
import api from "../../api/api"

const Settings = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { data: profile, isLoading: loading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/profile");
      return res.data;
    },
  });

  if(loading){
    return <Loading />
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>

      {profile && <ProfileForm initialData={profile} />}

      <div className="settings-password-card">
        <div className="flex items-center gap-3">
          <div className="settings-icon-box">
            <Lock className="settings-icon" />
          </div>

          <div>
            <p className="settings-card-title">Password</p>
            <p className="settings-card-subtitle">Update your account password</p>
          </div>
        </div>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="btn-secondary text-sm"
        >
          Change Password
        </button>
      </div>

      <ChangePasswordModal 
        open={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)} 
      />
    </div>
  )
}

export default Settings
