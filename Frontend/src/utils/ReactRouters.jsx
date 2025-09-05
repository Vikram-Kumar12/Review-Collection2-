import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/authentication/Login";
import Navbar from "../components/Home/Navbar";
import Profile from "../pages/Profile";
import PostReview from "../pages/PostReview";
import Dashboard from "../pages/Dashboard";
import useAuth from "../hooks/useAuth.js";
import RoleBasedRoute from "./RoleBasedRoute.jsx";
const ProctedRequest = () => {
  const { user } = useAuth();
  if (!user) {
    return (
      <>
        <Navigate to="/login" replace />
      </>
    );
  }
  return <Outlet />;
};
const ReactRouters = () => {
  const { isAuth } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {isAuth ? (
          <Route path="/login" element={<Home />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="/login" element={<Login />} />

        {/* Public route for any logged-in user */}
        <Route element={<ProctedRequest />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Only Admin and Cohort can access */}
        <Route element={<RoleBasedRoute allowedRoles={["Admin", "Cohort"]} />}>
          <Route path="/post-review" element={<PostReview />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default ReactRouters;
