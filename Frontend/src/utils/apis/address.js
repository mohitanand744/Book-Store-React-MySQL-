import { axiosInstance } from "../../services/api";

export const getStatesCites = async (pinCode) => {
  const response = await axiosInstance.get(
    `https://api.postalpincode.in/pincode/${pinCode}`,
  );
  return response.data;
};

export const getStatesFromDB = async () => {
  const response = await axiosInstance.get("/address/states", {
    withCredentials: true,
  });
  return response.data;
};

export const getAddresses = async () => {
  const response = await axiosInstance.get("/address", {
    withCredentials: true,
  });
  return response.data;
};

export const addAddress = async (data) => {
  const response = await axiosInstance.post("/address", data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateAddress = async (id, data) => {
  const response = await axiosInstance.put(`/address/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteAddress = async (id) => {
  const response = await axiosInstance.delete(`/address/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
