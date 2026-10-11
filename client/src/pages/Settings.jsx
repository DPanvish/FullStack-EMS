import { useEffect, useState } from "react"
import Loading  from "../components/Loading"
import { Lock } from "lucide-react"
import ProfileForm from "../components/ProfileForm"
import ChangePasswordModal from "../components/ChangePasswordModal"
import { useAuth } from "../../context/AuthContext"
import toast from "react-hot-toast"
import api from "../../api/api"


const Settings = () => {
  const {user} = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async() => {
    try{
      const res = await api.get("/profile");
      const profile = res.data;

      if(profile){
        setProfile(profile);
      }
    }catch(error){
      toast.error(error?.response?.data?.error || error?.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  if(loading){
    return <Loading />
  }


  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>

      {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile} />}

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
          Change
        </button>
      </div>

      <ChangePasswordModal open={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
    </div>
  )
}

export default Settings
