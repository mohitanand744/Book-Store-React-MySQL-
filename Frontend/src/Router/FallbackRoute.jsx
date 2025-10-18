import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

// Fallback Route Component
export const FallbackRoute = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [hasShownToast, setHasShownToast] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (showNotification && !hasShownToast) {
      toast.error(`The page "${location.pathname}" was not found.`, {
        duration: 3000,
        id: "page-not-found",
      });
      setHasShownToast(true);

      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showNotification, hasShownToast, location.pathname]);

  return (
    <>
      <Navigate to="/nextChapter" replace />
    </>
  );
};
