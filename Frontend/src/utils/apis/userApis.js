import { axiosInstance, axiosInstanceFormData } from "../../services/api";

export const userApis = {
  getUserDetails: async () => {
    console.log("llllllllllllllllllllllllll");

    const response = await axiosInstance.get("/user/me");
    return response.data;
  },

  uploadProfilePic: async (formData) => {
    const response = await axiosInstanceFormData.post(
      "/user/profile-pic",
      formData
    );
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.put("/user/profile-update", data);
    return response.data;
  }
};
