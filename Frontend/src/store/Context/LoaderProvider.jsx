// React API Loader Implementation with External Axios Config
import React, { useState, createContext } from "react";

// Create a context for the loader
export const LoaderContext = createContext();

// Loader provider component
export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  // Function to show loader
  const showLoader = () => {
    setRequestCount((prev) => prev + 1);
    setLoading(true);
    setProgress(30); // Start at 30% to give immediate feedback
  };

  // Function to hide loader
  const hideLoader = () => {
    setRequestCount((prev) => {
      if (prev <= 1) {
        // Complete the progress animation before hiding
        setProgress(100);
        setTimeout(() => setLoading(false), 300);
        return 0;
      }
      return prev - 1;
    });
  };

  // Function to update progress (for more precise loading)
  const updateProgress = (value) => {
    if (loading) {
      setProgress(Math.min(value, 90)); // Never reach 100% until hideLoader is called
    }
  };

  return (
    <LoaderContext.Provider
      value={{ loading, showLoader, hideLoader, updateProgress }}
    >
      {children}
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-1">
          <div
            className="h-full transition-all duration-300 ease-out bg-red-600 rounded-full"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 w-3 h-3 -mt-1 bg-red-600 rounded-full opacity-0 animate-pulse"></div>
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
};
