import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading"
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

const Payslips = () => {
  const {user} = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const { data: payslips = [], isLoading: payslipsLoading } = useQuery({
    queryKey: ["payslips"],
    queryFn: async () => {
      const res = await api.get("/payslips");
      return res.data?.data || [];
    },
  });

  const { data: employees = [], isLoading: employeesLoading } = useQuery({
    queryKey: ["employees", "active"],
    queryFn: async () => {
      const res = await api.get("/employees");
      return (res.data || []).filter((e) => !e.isDeleted);
    },
    enabled: isAdmin,
  });

  const loading = payslipsLoading || (isAdmin && employeesLoading);

  if(loading){
    return <Loading />
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">{isAdmin ? "Generate and manage employee payslips" : "Your payslip history"}</p>
        </div>
        {isAdmin && <GeneratePayslipForm employees={employees} />}
      </div>
      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  )
}

export default Payslips
