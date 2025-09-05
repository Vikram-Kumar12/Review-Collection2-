import { useState } from "react";
import ListedReviewCard from "./ListedReviewCard";
import ReviewModal from "./ReviewModal";
import { useEffect } from "react";
import { getAllReview } from "../../service/postReviewService.js";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ListedReviewsSection = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReview();
        setReviewData(response?.data?.allReviewData);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Internal server error!");
      }
    };
    fetchReviews();
  }, []);

  const updateLikeCount = (reviewId, newCount) => {
    setReviewData((prevData) =>
      prevData.map((item) =>
        item._id === reviewId ? { ...item, likesCount: newCount } : item
      )
    );
  };

  const updateCommentCount = (reviewId, newCount) => {
    setReviewData((prevData) =>
      prevData.map((item) =>
        item._id === reviewId ? { ...item, commentCount: newCount } : item
      )
    );
  };

  return (
    <section className="bg-black text-white py-10 px-4 min-h-screen">
      <div className="text-center">
        <div className="relative inline-block mb-2">
          <h2 className="text-3xl md:text-4xl font-bold  text-white mb-10 relative z-10">
            Listed Reviews
          </h2>
          <div className="absolute inset-0 opacity-30 lg:opacity-30  blur-2xl z-0 bg-[#EA580C]"></div>
        </div>
      </div>

      {reviewData?.length === 0 && (
        <div className="w-full h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 border-2 border-gray-800 rounded-2xl shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-100">
              No reviews yet
            </h3>
            <p className="mt-1 text-sm text-gray-300">
              Get started by submitting your first review!
            </p>
            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-600 cursor-pointer"
              >
                <Link to="/post-review">Submit a Review</Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {reviewData?.map((item, index) => (
          <div
            key={index}
            className="h-full flex items-center justify-center border border-orange-500 lg:border-gray-800 hover:border-orange-500 bg-black text-white transition-all duration-700 rounded-md "
          >
            <ListedReviewCard
              key={index}
              reviewId={item?._id}
              user={item?.author?.name}
              authorImg={item?.author?.avatar}
              time={item?.createdAt}
              review={
                item?.reviewType === "Text"
                  ? item?.content?.slice(0, 600) +
                    (item.content.length > 600 ? "..." : "")
                  : item?.content?.slice(0, 50) +
                    (item.content.length > 50 ? "..." : "")
              }
              image={item?.imageUrl[0]}
              video={item?.videoUrl}
              type={item?.reviewType}
              likes={item?.likesCount}
              comments={item?.commentCount}
              onLikeUpdate={updateLikeCount}
              onClick={() => setSelectedReview(item)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className="h-full">
        {selectedReview && (
          <ReviewModal
            reviewData={selectedReview}
            onClose={() => setSelectedReview(null)}
            onLikeUpdate={updateLikeCount}
            onCommentUpdate={updateCommentCount}
          />
        )}
      </div>
    </section>
  );
};

export default ListedReviewsSection;
