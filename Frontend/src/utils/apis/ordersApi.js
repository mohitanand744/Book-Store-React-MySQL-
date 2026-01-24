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
    },
  );
  return response.data;
};

export const addToWishlist = async (bookId) => {
  const response = await axiosInstance.post(
    "/wishlist/add-to-wishlist",
    { bookId },
    { withCredentials: true },
  );
  return response.data;
};

export const getWishlist = async () => {
  const response = await axiosInstance.get("/wishlist/get-wishlist", {
    withCredentials: true,
  });
  return response.data;
};
