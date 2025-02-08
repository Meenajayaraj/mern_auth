import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://capstone-backend-mern-1.onrender.com/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
