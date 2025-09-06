import axiosInstance from "../api/axios.js";

export const loginUser = async () => {
  const VITE_API_URL = await import.meta.env.VITE_API_URL || "http:localhost:8000/api/v1";
  window.open(`${VITE_API_URL}/auth/login-with-google`, "_self");
};

export const logoutUser = async () => {
  return await axiosInstance.get("/auth/logout");
};
