import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/axios.js";
import { setAuth } from "../features/auth/authSlice.js";


export const useLoadingWithRefresh = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/refresh-user-auth");
        dispatch(setAuth(response?.data?.user));
      } catch (error) {
        Promise.reject(error)
      } finally {
        setLoading(false);
      }
    };
    refreshAuth();
  }, []);
  return loading;
};
