import { Navigate } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Dashboard />;
  } else {
    return <Navigate to={"/auth"} />;
  }
};

export default ProtectedRoutes;
