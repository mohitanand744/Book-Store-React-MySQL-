const BASE_URL = "http://localhost:16552"; // "https://book-store-react-mysql.onrender.com";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
