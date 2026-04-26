import { axiosInstance, externalAxiosInstance } from "../../services/api";

export const getStatesCites = async (pinCode) => {
  console.log("from", pinCode);

  const response = await externalAxiosInstance.get(
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

export const getUserAddresses = async () => {
  const response = await axiosInstance.get("/address/user-addresses", {
    withCredentials: true,
  });
  return response.data;
};

export const addAddress = async (data) => {
  const response = await axiosInstance.post("/address/create", data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateAddress = async (id, data) => {
  const response = await axiosInstance.put(`/address/update/${id}`, data, {
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


