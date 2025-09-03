import axiosInstance from "../api/axios.js";

export const loginUser = async () => {
  window.open("http://localhost:5000/api/v1/auth/login-with-google", "_self");
};

export const logoutUser = async () => {
  return await axiosInstance.get("/auth/logout");
};
