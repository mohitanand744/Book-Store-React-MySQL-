// hooks/useAxiosLoader.js
import { useEffect } from "react";
import axios from "axios";
import { useLoader } from "../Hooks/useLoader";
import attachInterceptors from "../Helper/attachInterceptors";

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

  useEffect(() => {
    attachInterceptors(axiosInstance, {
      showLoader,
      hideLoader,
      updateProgress,
    });

    attachInterceptors(axiosInstanceFormData, {
      showLoader,
      hideLoader,
      updateProgress,
    });
  }, []);
};

export { axiosInstance, axiosInstanceFormData };
