import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { toast } from "sonner";
import { useLoader } from "../Hooks/useLoader";
import Loading from "../components/Loaders/Loading";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logoutReason, isAuthenticating } = useAuth();

  if (isAuthenticating) return null;

  useEffect(() => {
    if (!isAuthenticated && logoutReason !== null) {
      toast.error("You must be logged in to access this page.");
    }
  }, [isAuthenticated, logoutReason]);

  if (!isAuthenticated && logoutReason !== null)
    return <Navigate to="/nextChapter" replace />;
  return children;
};

export default ProtectedRoute;
