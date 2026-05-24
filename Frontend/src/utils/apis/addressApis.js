import { axiosInstance, externalAxiosInstance } from "../../services/api";

export const addressApis = {
  getStatesCites: async (pinCode) => {
    console.log("from", pinCode);

    const response = await externalAxiosInstance.get(
      `https://api.postalpincode.in/pincode/${pinCode}`,
    );
    return response.data;
  },

  getStatesFromDB: async () => {
    const response = await axiosInstance.get("/address/states");
    return response.data;
  },

  getUserAddresses: async () => {
    const response = await axiosInstance.get("/address/user-addresses");
    return response.data;
  },

  addAddress: async (data) => {
    const response = await axiosInstance.post("/address/create", data);
    return response.data;
  },

  updateAddress: async (id, data) => {
    const response = await axiosInstance.put(`/address/update/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id) => {
    const response = await axiosInstance.delete(`/address/${id}`);
    return response.data;
  }
};
