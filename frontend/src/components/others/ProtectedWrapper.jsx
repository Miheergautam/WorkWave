import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function ProtectedWrapper({ children }) {
  const { user } = useAuth();
  if (!user) {
    setTimeout(() => {
      alert("You need to login first");
    }, 1000);
  }
  return user ? children : <Navigate to="/signin" />;
}
