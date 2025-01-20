const BASE_URL = "https://book-store-react-mysql.onrender.com";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default axiosInstance;
