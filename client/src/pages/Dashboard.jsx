import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";
import api from "../../api/api";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return (
      <p className="text-center text-slate-500 py-12">
        {error?.response?.data?.error || "Failed to load dashboard"}
      </p>
    );
  }

  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }
};

export default Dashboard;