import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { dummyPayslipData } from "../assets/assets"
import { format } from "date-fns"
import Loading from "../components/Loading"

const PrintPayslip = () => {
  const {id} = useParams();
  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPayslip(dummyPayslipData.find((slip) => slip._id === id))
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }, [id])

  if(loading){
    return <Loading />
  }

  if(!payslip){
    return <p className="print-payslip-missing">Payslip not found</p>
  }

  return (
    <div className="print-payslip-page">
      <div className="print-payslip-header">
        <h1 className="print-payslip-title">PAYSLIP</h1>
        <p className="print-payslip-period">{format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="print-payslip-label">Employee Name</p>
          <p className="print-payslip-value">{payslip.employee?.firstName} {payslip.employee?.lastName}</p>
        </div>

        <div>
          <p className="print-payslip-label">Position</p>
          <p className="print-payslip-value">{payslip.employee?.position}</p>
        </div>

        <div>
          <p className="print-payslip-label">Email</p>
          <p className="print-payslip-value">{payslip.employee?.email}</p>
        </div>

        <div>
          <p className="print-payslip-label">Period</p>
          <p className="print-payslip-value">{format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}</p>
        </div>
      </div>

      <div className="print-payslip-table-card">
        <table className="print-payslip-table">
          <thead>
            <tr className="print-payslip-head-row">
              <th className="print-payslip-head-left">Description</th>
              <th className="print-payslip-head-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="print-payslip-row">
              <td className="print-payslip-desc">Basic Salary</td>
              <td className="print-payslip-amount">${payslip.basicSalary?.toLocaleString()}</td>
            </tr>

            <tr className="print-payslip-row">
              <td className="print-payslip-desc">Allowances</td>
              <td className="print-payslip-amount">${payslip.allowances?.toLocaleString()}</td>
            </tr>

            <tr className="print-payslip-row">
              <td className="print-payslip-desc">Deductions</td>
              <td className="print-payslip-amount">${payslip.deductions?.toLocaleString()}</td>
            </tr>

            <tr className="print-payslip-total-row">
              <td className="print-payslip-total-label">Net Salary</td>
              <td className="print-payslip-total-amount">${payslip.netSalary?.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="print-payslip-actions">
        <button className="btn-primary print:hidden" onClick={() => window.print()}>Print Payslip</button>
      </div>
    </div>
  )
}

export default PrintPayslip
