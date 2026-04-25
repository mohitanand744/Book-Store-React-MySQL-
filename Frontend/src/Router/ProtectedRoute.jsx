import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { toast } from "sonner";
import { useLoader } from "../Hooks/useLoader";
import Loading from "../components/Loaders/Loading";
import BooksLoader from "../components/Loaders/BooksLoader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logoutReason } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && logoutReason !== "manual") {
      toast.error("You must be logged in to access this page.", {
        id: "auth-toast",
      });
    }
  }, [isAuthenticated, logoutReason]);

  if (!isAuthenticated) return <Navigate to="/nextChapter" replace />;
  return children;
};

export default ProtectedRoute;

