import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to access this page.");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
