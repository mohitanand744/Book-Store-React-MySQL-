import { axiosInstance, axiosInstanceFormData } from "../../services/api";

export const getUserDetails = async () => {
  console.log("llllllllllllllllllllllllll");

  const response = await axiosInstance.get("/user/me", {
    withCredentials: true,
  });
  return response.data;
};

export const uploadProfilePic = async (formData) => {
  const response = await axiosInstanceFormData.post(
    "/user/profile-pic",
    formData,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axiosInstance.put("/user/profile-update", data, {
    withCredentials: true,
  });
  return response.data;
};


