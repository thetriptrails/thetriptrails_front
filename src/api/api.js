import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.warn("Unauthorized - Logging out...");
        localStorage.removeItem("token");
      }
      if (status === 500) {
        console.error("Server error - please try again later.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;