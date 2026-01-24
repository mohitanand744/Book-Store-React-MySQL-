import { axiosInstance } from "../../services/api";

const getSingleBook = async (id) => {
  console.log(id);

  const response = await axiosInstance.get(`/api/books/${id}`);

  console.log(response);

  return response.data;
};

const getAllBooks = async () => {
  const response = await axiosInstance.get(`/books`, {
    withCredentials: true,
  });

  console.log(response);
  return response.data;
};

export { getSingleBook, getAllBooks };
