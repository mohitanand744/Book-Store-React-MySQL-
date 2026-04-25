import { axiosInstance } from "../../services/api";

export const getAllCategories = async () => {
  const response = await axiosInstance.get("/categories/lists");
  return response.data;
};


