// hooks/useAxiosLoader.js
import { useEffect } from "react";
import axios from "axios";
import { useLoader } from "../Hooks/useLoader";
import attachInterceptors from "../Helper/attachInterceptors";
import useAuth from "../Hooks/useAuth";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
const API_VERSION = import.meta.env.VITE_API_VERSION || "v1";
const BASE_URL = `${API_BASE}/${API_VERSION}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  },
});

const axiosInstanceFormData = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  },
});

export const useAxiosLoader = () => {
  const { showLoader, hideLoader, updateProgress } = useLoader();
  const { logoutStatusSuccess } = useAuth();

  useEffect(() => {
    const defaultInterceptors = attachInterceptors(axiosInstance, {
      showLoader,
      hideLoader,
      updateProgress,
      logoutStatusSuccess,
    });

    const formDataInterceptors = attachInterceptors(axiosInstanceFormData, {
      showLoader,
      hideLoader,
      updateProgress,
      logoutStatusSuccess,
    });

    return () => {
      axiosInstance.interceptors.request.eject(defaultInterceptors.reqInterceptor);
      axiosInstance.interceptors.response.eject(defaultInterceptors.resInterceptor);

      axiosInstanceFormData.interceptors.request.eject(formDataInterceptors.reqInterceptor);
      axiosInstanceFormData.interceptors.response.eject(formDataInterceptors.resInterceptor);
    };
  }, []);
};

export { axiosInstance, axiosInstanceFormData };


