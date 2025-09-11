import { axiosInstance } from "../../services/api";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const logout = async () => {
  return await axiosInstance.post("/auth/logout");
};
