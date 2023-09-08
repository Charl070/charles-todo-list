import axios, { AxiosInstance } from "axios";

// Create an Axios instance with default configurations
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://todos.appsquare.io",
  headers: {
    Authorization: "Bearer charles-token",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json-patch+json",
    withCredentials: true,
  },
});

export default axiosInstance;
