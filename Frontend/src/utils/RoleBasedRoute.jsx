import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const RoleBasedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RoleBasedRoute;
