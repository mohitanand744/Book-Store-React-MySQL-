import { axiosInstance, axiosInstanceFormData } from "../../services/api";


export const authApis = {

  login: async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  },
  signup: async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post(
      "/auth/logout"
    );

    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await axiosInstance.post("/auth/forgot-password", { email });
    return response.data;
  },
  verifyResetToken: async (token) => {
    const response = await axiosInstance.post(`/auth/verify-reset-token`, {
      token,
    });

    return response.data;
  },
  resetPassword: async (
    email,
    newPassword,
    confirmPassword,
    resetToken,
  ) => {
    const response = await axiosInstance.post("/auth/reset-password", {
      email,
      newPassword,
      confirmPassword,
      resetToken,
    });
    return response.data;
  },

}
