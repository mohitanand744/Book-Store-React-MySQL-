import { axiosInstance } from "../../services/api";

export const categoryApis = {
  getAllCategories: async () => {
    const response = await axiosInstance.get("/categories/lists");
    return response.data;
  }
};
