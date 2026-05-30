import { axiosInstance } from "../../services/api";

export const ordersApis = {
  getAllOrders: async () => {
    console.log("Getting Orders");

    const response = await axiosInstance.get("/orders/order-list");
    return response.data;
  },

  getTrackingItem: async (itemsId, trackingId) => {
    console.log("Getting Tracking Item");

    const response = await axiosInstance.get(
      `/orders/track/${itemsId}/${trackingId}`
    );
    return response.data;
  },

  addToWishlist: async (bookId) => {
    const response = await axiosInstance.post(
      "/wishlist/toggle-wishlist",
      { bookId }
    );
    return response.data;
  },

  getWishlist: async () => {
    const response = await axiosInstance.get("/wishlist/get-wishlist");
    return response.data;
  }
};
