import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react"


const GeneratePayslipForm = ({employees, onSuccess}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
  }

  if(!isOpen){
    return(
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Generate Payslip
      </button>
    )
  }
  return (
    <div className="payslip-modal-backdrop">
      <div className="payslip-modal-panel">
        <div className="flex justify-between items-center mb-6">
          <h3 className="payslip-modal-title">Generate Monthly Payslip</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="payslip-modal-close"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="payslip-form-label">Employee</label>
            <select name="employeeId" required>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.firstName} {e.lastName} ({e.position})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="payslip-form-label">Month</label>
              <select name="month">
                {Array.from({length: 12}, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="payslip-form-label">Year</label>
              <input type="number" name="year" defaultValue={new Date().getFullYear()} />
            </div>
          </div>

          <div>
            <label className="payslip-form-label">Basic Salary</label>
            <input type="number" name="basicSalary" required placeholder="5000" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="payslip-form-label">Allowances</label>
              <input type="number" name="allowances" defaultValue="0" />
            </div>
            <div>
              <label className="payslip-form-label">Deductions</label>
              <input type="number" name="deductions" defaultValue="0" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              onClick={() => setIsOpen(false)}
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
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GeneratePayslipForm
