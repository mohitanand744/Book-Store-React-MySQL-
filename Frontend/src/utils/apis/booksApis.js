import { axiosInstance } from "../../services/api";

const getSingleBook = async (id) => {
  console.log(id);

  const response = await axiosInstance.get(`/api/books/${id}`);

  console.log(response);

  return response.data;
};

const getAllBooks = async (params) => {
  const response = await axiosInstance.get(`/books`, {
    params,
    withCredentials: true,
  });

  console.log(response);
  return response.data;
};

export { getSingleBook, getAllBooks };


