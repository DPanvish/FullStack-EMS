import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { DEPARTMENTS } from "../assets/assets";
import { Loader2Icon } from "lucide-react";

const EmployeeForm = ({initialData, onSuccess, onCancel}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData;
  
  const handleSubmit = async(e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl animate-fade-in">
      <div className="employee-form-section">
        <h3 className="employee-form-title">Personal Information</h3>
        <div className="employee-form-grid">
          <div>
            <label className="employee-form-label">First Name</label>
            <input name="firstName" required defaultValue={initialData?.firstName} />
          </div>
          <div>
            <label className="employee-form-label">Last Name</label>
            <input name="lastName" required defaultValue={initialData?.lastName} />
          </div>
          <div>
            <label className="employee-form-label">Phone Number</label>
            <input name="phone" required defaultValue={initialData?.phone} />
          </div>
          <div>
            <label className="employee-form-label">Join Date</label>
            <input type="date" name="joinDate" required defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split("T")[0] : ""} />
          </div>
          <div className="sm:col-span-2">
            <label className="employee-form-label">Bio (Optional)</label>
            <textarea name="bio" defaultValue={initialData?.bio} rows={3} className="resize-none" placeholder="Brief description..." />
          </div>
        </div>
      </div>

      <div className="employee-form-section">
        <h3 className="employee-form-title">Employment Details</h3>
        <div className="employee-form-grid">
          <div>
            <label className="employee-form-label">Department</label>
            <select name="department" defaultValue={initialData?.department || ""}>
              <option value="">Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="employee-form-label">Position</label>
            <input name="position" required defaultValue={initialData?.position} />
          </div>
          <div>
            <label className="employee-form-label">Basic Salary</label>
            <input type="number" name="basicSalary" required min="0" step="0.01" defaultValue={initialData?.basicSalary || 0} />
          </div>
          <div>
            <label className="employee-form-label">Allowances</label>
            <input type="number" name="allowances" required min="0" step="0.01" defaultValue={initialData?.allowances || 0} />
          </div>
          <div>
            <label className="employee-form-label">Deductions</label>
            <input type="number" name="deductions" required min="0" step="0.01" defaultValue={initialData?.deductions || 0} />
          </div>

          {isEditMode && (
            <div>
              <label className="employee-form-label">Status</label>
              <select name="employmentStatus" defaultValue={initialData?.employmentStatus}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="employee-form-section">
        <h3 className="employee-form-title">Account Setup</h3>
        <div className="employee-form-grid">
          <div className="sm:col-span-2">
            <label className="employee-form-label">Work Email</label>
            <input type="email" name="email" required defaultValue={initialData?.email} />
          </div>

          {!isEditMode && (
            <div>
              <label className="employee-form-label">Temporary Password</label>
              <input type="password" name="password" required />
            </div>
          )}

          {isEditMode && (
            <div>
              <label className="employee-form-label">Change Password (Optional)</label>
              <input type="password" name="password" placeholder="Leave blank to keep current" />
            </div>
          )}

          <div>
              <label className="employee-form-label">System Role</label>
              <select name="role" defaultValue={initialData?.user?.role || "EMPLOYEE"}>
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button type="button" className="btn-secondary" onClick={() => onCancel ? onCancel() : navigate(-1)}>Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center">
          {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm
