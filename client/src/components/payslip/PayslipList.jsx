import { format } from 'date-fns';
import { Download } from "lucide-react"

const PayslipList = ({payslips, isAdmin}) => {
  return (
    <div className="payslip-list-card">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Period</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="payslip-empty">
                  No payslips found
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => {
                return (
                  <tr key={payslip._id || payslip.id}>
                    {isAdmin && (
                      <td className="payslip-employee-cell">
                        {payslip.employee?.firstName}{" "}
                        {payslip.employee?.lastName}
                      </td>
                    )}

                    <td>
                      {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                    </td>

                    <td className="payslip-muted-cell">
                      ${payslip.basicSalary?.toLocaleString()}
                    </td>

                    <td className="payslip-amount-cell">
                      ${payslip.netSalary?.toLocaleString()}
                    </td>

                    <td className="text-center">
                      <button 
                      onClick={() => window.open(`/print/payslips/${payslip._id || payslip.id}`)}
                        className="payslip-download-button"
                      >
                        <Download className="w-3 h-3 mr-1.5" /> Download
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PayslipList
