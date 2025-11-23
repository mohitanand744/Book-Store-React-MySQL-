import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

export const FallbackRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirect = () => {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1); // Go back if there's history
      } else {
        navigate("/", { replace: true }); // Fallback to home page
      }
    };

    toast.error(
      `The page "${location.pathname}" was not found. Redirecting...`,
      {
        duration: 3000,
        id: "page-not-found",
      }
    );

    const timer = setTimeout(redirect, 0);
    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  return null;
};
