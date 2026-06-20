import { PencilIcon, Trash2Icon } from "lucide-react"


const EmployeeCard = ({employee, onDelete, onEdit}) => {
  
  const handleDelete = async() => {
    if(!confirm("Are you sure you want to delete this employee ?")){
      return;
    }
  }
  return (
    <div className="group employee-card">
      <div className="employee-card-media">
        <div className="w-full h-full flex items-center justify-center">
          <div className="employee-avatar">
            <span className="employee-avatar-text">
              {employee.firstName[0]} {employee.lastName[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-3 left-3 flex gap-2">
        <span className="employee-dept-badge">{employee.department || "Remote"}</span>
        {employee.isDeleted && <span className="employee-deleted-badge">DELETED</span>}
      </div>

      {!employee.isDeleted && (
        <div className="employee-card-overlay">
          <button
            aria-label={`Edit ${employee.firstName} ${employee.lastName}`}
            onClick={() => onEdit(employee)}
            className="employee-card-action"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            aria-label={`Delete ${employee.firstName} ${employee.lastName}`}
            onClick={handleDelete}
            className="employee-card-delete"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="p-5">
        <h3 className="employee-card-name">{employee.firstName} {employee.lastName}</h3>
        <p className="employee-card-position">{employee.position}</p>
      </div>
    </div>

  )
}

export default EmployeeCard
