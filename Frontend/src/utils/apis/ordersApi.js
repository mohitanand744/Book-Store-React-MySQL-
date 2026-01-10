import { axiosInstance } from "../../services/api";

export const getAllOrders = async () => {
  console.log("llllllllllllllllllllllllll");

  const response = await axiosInstance.get("/orders/order-list", {
    withCredentials: true,
  });
  return response.data;
};
