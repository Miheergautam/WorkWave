import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function RequireAuth() {
  console.log("RequireAuth.jsx");
  const { auth } = useAuth();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/signin"  />
  );
}
