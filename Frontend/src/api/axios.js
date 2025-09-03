import axios from "axios";

const VITE_API_URL =
  import.meta.env.VITE_API_URL || "http:localhost:8000/api/v1";
  
const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.data?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const resposne = await axios.post(
          `${VITE_API_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        const newAccessToken = resposne?.data?.accessToken;
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      } catch (error) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
