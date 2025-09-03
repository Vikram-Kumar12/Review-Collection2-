import axiosInstance from "../api/axios.js"
export const postReview = async (formData) => {
  return await axiosInstance.post("/review/create-review", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};