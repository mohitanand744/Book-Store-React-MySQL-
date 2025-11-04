import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logoutReason } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && logoutReason !== "tokenExpired") {
      toast.error("You must be logged in to access this page.");
    }
  }, [isAuthenticated, logoutReason]);

  if (!isAuthenticated) return <Navigate to="/nextChapter" replace />;
  return children;
};

export default ProtectedRoute;
