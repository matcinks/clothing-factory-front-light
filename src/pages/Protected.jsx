import { Outlet, Navigate } from "react-router-dom";

const Protected = () => {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Protected;
