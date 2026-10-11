import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react"
import api from "../../../api/api";
import toast from "react-hot-toast";

const GeneratePayslipForm = ({employees, onSuccess}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [deductions, setDeductions] = useState("");

  const handleOpen = () => {
    const first = employees[0];
    if(first){
      setSelectedEmpId(first.id || first._id);
      setBasicSalary(first.basicSalary ?? "");
      setAllowances(first.allowances ?? 0);
      setDeductions(first.deductions ?? 0);
    }
    setIsOpen(true);
  }

  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    setSelectedEmpId(empId);
    const emp = employees.find((x) => (x.id || x._id) === empId);
    if(emp){
      setBasicSalary(emp.basicSalary ?? "");
      setAllowances(emp.allowances ?? 0);
      setDeductions(emp.deductions ?? 0);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try{
      await api.post("/payslips", data);
      setIsOpen(false);
      onSuccess();
    }catch(error){
      toast.error(error.response?.data?.error || error?.message);
    }finally{
      setLoading(false);
    }
  }

  if(!isOpen){
    return(
      <button
        onClick={handleOpen}
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
            <select 
              name="employeeId" 
              required 
              value={selectedEmpId} 
              onChange={handleEmployeeChange}
            >
              {employees.map((e) => (
                <option key={e.id || e._id} value={e.id || e._id}>
                  {e.firstName} {e.lastName} ({e.position})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="payslip-form-label">Month</label>
              <select name="month" defaultValue={new Date().getMonth() + 1}>
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
            <input 
              type="number" 
              name="basicSalary" 
              required 
              placeholder="5000" 
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="payslip-form-label">Allowances</label>
              <input 
                type="number" 
                name="allowances" 
                value={allowances}
                onChange={(e) => setAllowances(e.target.value)}
              />
            </div>
            <div>
              <label className="payslip-form-label">Deductions</label>
              <input 
                type="number" 
                name="deductions" 
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
              />
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
