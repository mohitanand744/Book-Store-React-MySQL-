import { axiosInstance } from "../../services/api";

const getSingleBook = async (id) => {
  console.log(id);

  const response = await axiosInstance.get(`/api/books/${id}`);

  console.log(response);
};

export { getSingleBook };
