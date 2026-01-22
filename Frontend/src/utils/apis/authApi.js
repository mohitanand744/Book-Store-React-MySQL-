import { axiosInstance, axiosInstanceFormData } from "../../services/api";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post(
    "/auth/logout",
    {},
    { withCredentials: true },
  );

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
export const resetPassword = async (
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
};

export const getUserDetails = async () => {
  console.log("llllllllllllllllllllllllll");

  const response = await axiosInstance.get("/auth/me", {
    withCredentials: true,
  });
  return response.data;
};

export const uploadProfilePic = async (formData) => {
  const response = await axiosInstanceFormData.post(
    "/auth/profile-pic",
    formData,
    {
      withCredentials: true,
    },
  );
  return response.data;
};
