import { axiosInstance } from "../../services/api";

const getSingleBook = async (id) => {
  console.log(id);

  const responce = await axiosInstance.get(`/api/books/${id}`);

  console.log(responce);
};

export { getSingleBook };
