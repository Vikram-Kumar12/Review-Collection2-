import axiosInstance from "../api/axios.js"
export const postReview = async (formData) => {
  return await axiosInstance.post("/review/create-review", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllReview = async()=>{
  return await axiosInstance.get('/review/get-all-review')
}

export const getReviewByUser = async()=>{
  return await axiosInstance.get('/review/get-review-by-user')
}

export const deleteReviewById = async(reviewId)=>{
  return await axiosInstance.delete(`/review/delete-review/${reviewId}`)
}