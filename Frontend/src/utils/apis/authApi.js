import { axiosInstance } from "../../services/api";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

export const verifyResetToken = async (token) => {
  console.log(token, "ggggggggggggggggggggggggggg");

  const response = await axiosInstance.post(`/auth/verify-reset-token`, {
    token,
  });

  return response.data;
};
export const resetPassword = async (email, newPassword, resetToken) => {
  const response = await axiosInstance.post("/auth/reset-password", {
    email,
    newPassword,
    resetToken,
  });
  return response.data;
};

export const getUserDetails = async () => {
  const response = await axiosInstance.get("/auth/me", { requiresAuth: true });
  return response.data;
};
