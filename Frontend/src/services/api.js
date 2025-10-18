// hooks/useAxiosLoader.js
import { useEffect } from "react";
import axios from "axios";
import { useLoader } from "../Hooks/useLoader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";

const BASE_URL = "http://localhost:3001/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstanceFormData = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const useAxiosLoader = () => {
  const { showLoader, hideLoader, updateProgress } = useLoader();
  const { logoutStatusSuccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        console.log("Loader Start");
        showLoader();

        // ✅ Only attach token if explicitly required
        if (config.requiresAuth) {
          const token = localStorage.getItem("token");
          if (token) config.headers.Authorization = `Bearer ${token}`;
        }

        // Track progress if available
        config.onUploadProgress = (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          updateProgress(percentCompleted);
        };

        config.onDownloadProgress = (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          updateProgress(percentCompleted);
        };

        return config;
      },
      (error) => {
        hideLoader();
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        hideLoader();
        return response;
      },
      (error) => {
        hideLoader();

        if (error.response?.status === 401) {
          const err = error.response?.data?.error;

          console.log("ERR-->", err);

          if (err?.name === "TokenExpiredError") {
            toast.error("Session expired. Please login again.");
          } else {
            toast.error("Unauthorized. Please login again.");
          }

          navigate("/nextChapter");

          setTimeout(() => {
            logoutStatusSuccess();
          }, 100);
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};

export { axiosInstance, axiosInstanceFormData };
