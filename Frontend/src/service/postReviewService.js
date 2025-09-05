import axiosInstance from "../api/axios.js";
export const postReview = async (formData) => {
  return await axiosInstance.post("/review/create-review", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllReview = async () => {
  return await axiosInstance.get("/review/get-all-review");
};

export const getReviewByUser = async () => {
  return await axiosInstance.get("/review/get-review-by-user");
};

export const deleteReviewById = async (reviewId) => {
  return await axiosInstance.delete(`/review/delete-review/${reviewId}`);
};

export const toggleLike = async (data) => {
  return await axiosInstance.post("/like/like-review", data);
};

export const createComment = async(data)=>{
  return await axiosInstance.post('/comment/post-comment',data)
}

export const getAllComment = async(reviewId)=>{  
  return await axiosInstance.get(`/comment/all-comment/${reviewId}`)
}

export const deleteComment = async(data)=>{
  return await axiosInstance.delete('/comment/delete-comment',{
    data:data
  })
}
