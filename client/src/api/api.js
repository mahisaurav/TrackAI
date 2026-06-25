import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  console.warn(
    "VITE_API_URL is not set. API requests will fail until you configure client/.env",
  );
}

const api = axios.create({
  baseURL: baseURL || "",
  withCredentials: true,
});

export default api;
