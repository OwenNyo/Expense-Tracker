// axiosInstance.js
import axios from "axios";
import { BASE_URL } from "./apiPaths"; // Import the base backend URL

// Create a reusable Axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set the base URL for all requests
  timeout: 10000, // Timeout counter
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Optional: Add a request interceptor to attach auth token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("token"); // Get token from localStorage (if stored after login)
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.reponse) {
      if (error.response.status === 401) {
        //Redirect to login page
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECCONABORTED") {
      console.error("REquest timeout. Please try again later.");
    }
    return Promise.reject(Error);
  }
);

export default axiosInstance;
