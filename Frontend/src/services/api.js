// hooks/useAxiosLoader.js
import { useEffect } from "react";
import axios from "axios";
import { useLoader } from "../Hooks/useLoader";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001/api/v1"; // change for prod

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
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        showLoader();
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
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
        // handle 401 (unauthorized) globally
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/"); // redirect to login
        }

        return Promise.reject(error);
      }
    );

    // Cleanup on unmount (important!)
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [showLoader, hideLoader, updateProgress]);
};

export { axiosInstance, axiosInstanceFormData };
