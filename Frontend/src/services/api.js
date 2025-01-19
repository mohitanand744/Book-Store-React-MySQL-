const BASE_URL = "http://localhost:5000";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default axiosInstance;
