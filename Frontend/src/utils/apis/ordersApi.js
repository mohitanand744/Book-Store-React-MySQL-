import { axiosInstance } from "../../services/api";

export const getAllOrders = async () => {
  console.log("Getting Orders");

  const response = await axiosInstance.get("/orders/order-list", {
    withCredentials: true,
  });
  return response.data;
};

export const getTrackingItem = async (itemsId, trackingId) => {
  console.log("Getting Tracking Item");

  const response = await axiosInstance.get(
    `/orders/track/${itemsId}/${trackingId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
