import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";
import { useState } from "react"


const CheckInButton = ({todayRecord, onAction}) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onAction();
    }, 1000)
  }

  if(todayRecord?.checkOut){
    return(
      <div className="attendance-completed">
        <h3 className="attendance-completed-title">Work Day Completed</h3>
        <p className="attendance-completed-text">Great job! See you tomorrow</p>
      </div>
    )
  }

  const isCheckedIn = !!todayRecord?.isCheckedIn;

  return (
    <div className="absolute bottom-4 right-4 flex flex-col z-1">
      <button
        onClick={handleAttendance}
        disabled={loading}
        className={`attendance-action-button ${isCheckedIn ? "attendance-action-checkout" : "attendance-action-checkin"}`}
      >
        {loading ? <Loader2Icon className="size-7 animate-spin" /> : isCheckedIn ? <LogOutIcon className="size-7" /> : <LogInIcon className="size-7" />}

        <div className="relative flex flex-col items-center text-center">
          <h2 className="attendance-action-title">{loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}</h2>
          <p className="attendance-action-subtitle">{isCheckedIn ? "Click to end your shift" : "start your work day"}</p>
        </div>
      </button>
    </div>
  )
}

export default CheckInButton
