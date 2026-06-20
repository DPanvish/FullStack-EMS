import { useCallback, useState, useEffect } from "react"
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets"
import {Plus, Search, X} from "lucide-react";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";


const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setEmployees(dummyEmployeeData.filter((emp) => (selectedDept ? emp.department === selectedDept : emp)));
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filtered = employees.filter((emp) => `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search.toLowerCase()));


  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus size={16} /> Add Employee
        </button>
      </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
                <Search className="employee-search-icon" />
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="Search employees..."
                    className="w-full pl-10!"
                />
            </div>

            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="max-w-40">
                <option value="">All Departments</option>
                {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                ))}
            </select>
        </div>

        {/* Employee Cards */}
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="employee-loader" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.length === 0 ? (
              <p className="employee-empty">No employees found</p>
            ) : (
              filtered.map((emp) => <EmployeeCard key={emp.id} employee={emp} onDelete={fetchEmployees} onEdit={(e) => setEditEmployee(e)} />)
            )}
          </div>
        )}

        {/* Create Employee Modal */}
        {showCreateModal && (
          <div className="employee-modal-backdrop" onClick={() => setShowCreateModal(false)}>
            <div className="fixed inset-0" />
            <div className="employee-modal-panel" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 pb-0">
                <div>
                  <h2 className="employee-modal-title">Add New Employee</h2>
                  <p className="employee-modal-subtitle">Create a user account and employee profile</p>
                </div>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="employee-modal-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <EmployeeForm 
                  
                  onSuccess={() => {
                    setShowCreateModal(false);
                    fetchEmployees();
                  }}
                  onCancel={() => setShowCreateModal(false)} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Edit Employee Modal */}
        {editEmployee && (
          <div className="employee-modal-backdrop" onClick={() => setEditEmployee(null)}>
            <div className="employee-modal-panel" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 pb-0">
                <div>
                  <h2 className="employee-modal-title">Edit Employee</h2>
                  <p className="employee-modal-subtitle">Update employee details</p>
                </div>
                <button 
                  onClick={() => setEditEmployee(null)}
                  className="employee-modal-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <EmployeeForm 
                  initialData={editEmployee} 
                  onSuccess={() => {
                    setEditEmployee(null);
                    fetchEmployees();
                  }}
                  onCancel={() => setEditEmployee(null)} 
                />
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Employees
