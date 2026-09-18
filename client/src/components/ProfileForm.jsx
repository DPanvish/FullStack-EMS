import { useState } from "react"

const ProfileForm = ({initialData, onSuccess}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
  }
  return (
    <div>ProfileForm</div>
  )
}

export default ProfileForm