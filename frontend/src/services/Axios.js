import axios from "axios";

var url = "http://localhost:3080";

const axiosInstance = axios.create({
  baseURL: url, // Replace with your API's base URL
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add interceptors for request and response (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add token here, e.g., `config.headers.Authorization = 'Bearer <token>';`
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
