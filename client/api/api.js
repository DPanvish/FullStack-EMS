import axios from "axios";

const baseURL = `${import.meta.env.VITE_BASE_URL || "http://localhost:4000"}/api`;

const api = axios.create({
  baseURL
})

// Attach Auth token to all network requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
});

// Auto-handle expired token (401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes("/auth/login")) {
      localStorage.removeItem("token");
      if (typeof window !== "undefined" && window.location.pathname !== "/login" && !window.location.pathname.startsWith("/login/")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
