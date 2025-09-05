import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ReviewModal from "../Home/ReviewModal.jsx";
import ListedReviewCard from "../Home/ListedReviewCard.jsx";
import { getReviewByUser } from "../../service/postReviewService.js";
import useAuth from "../../hooks/useAuth.js";

export default function UserDashboard() {
  const [filter, setFilter] = useState("all");
  const [userReviewData, setUserReviewData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewByUser();
        setUserReviewData(response?.data?.reviewData);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Internal server error!");
      }
    };
    fetchReviews();
  }, []);

  const filteredReviews =
    filter === "all"
      ? userReviewData
      : userReviewData?.filter((r) => r?.reviewType === filter);

  const searchedReviews = searchQuery
    ? filteredReviews.filter(
        (review) =>
          review?.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review?.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredReviews;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const updateLikeCount = (reviewId, newCount) => {
    setUserReviewData((prevData) =>
      prevData.map((item) =>
        item._id === reviewId ? { ...item, likesCount: newCount } : item
      )
    );
  };

  const updateCommentCount = (reviewId, newCount) => {
    setUserReviewData((prevData) =>
      prevData.map((item) =>
        item._id === reviewId ? { ...item, commentCount: newCount } : item
      )
    );
  };

  return (
    <div className="min-h-screen  py-8 px-4 pt-35 lg:pt-20 mt-0 lg:mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-gray-800 border-2 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold  bg-gradient-to-r bg-clip-text text-transparent from-[#FE9332] to-[#EA580C]">
                My Learning Dashboard
              </h1>
              <p className="text-gray-200 mt-2">
                {`Welcome back, ${user?.name}! You've submitted ${userReviewData?.length} reviews so far.`}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-600 text-white px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {user?.role === "Admin"
                  ? "Administrator"
                  : "Web Development Cohort 2025"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-gray-800 border-2 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === "all"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600  text-white shadow-md"
                    : "bg-gray-200 text-black"
                }`}
              >
                All Reviews
              </button>
              <button
                onClick={() => setFilter("Text")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === "Text"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-200 text-black"
                }`}
              >
                Text Reviews
              </button>
              <button
                onClick={() => setFilter("Tweet")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === "Tweet"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-200 text-black"
                }`}
              >
                Tweet Reviews
              </button>
              <button
                onClick={() => setFilter("Video")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === "Video"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-200 text-black"
                }`}
              >
                Video Reviews
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent w-full md:w-64"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Stats for Student */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 "
        >
          <AnimatePresence>
            {searchedReviews?.map((review, index) => (
              <div
                key={index}
                className="h-full flex items-center justify-center border border-orange-500 lg:border-gray-800 bg-black hover:border-orange-500  text-white transition-all duration-700 rounded-md "
              >
                <ListedReviewCard
                  key={index}
                  reviewId={review?._id}
                  user={review?.author?.name}
                  authorImg={review?.author?.avatar}
                  time={review?.createdAt}
                  review={
                    review?.reviewType === "Text"
                      ? review?.content?.slice(0, 300) +
                        (review.content.length > 300 ? "..." : "")
                      : review?.content?.slice(0, 50) +
                        (review.content.length > 50 ? "..." : "")
                  }
                  image={review?.imageUrl[0]}
                  video={review?.videoUrl}
                  type={review?.reviewType}
                  likes={review?.likesCount}
                  comments={review?.commentCount}
                  onClick={() => setSelectedReview(review)}
                  onLikeUpdate={updateLikeCount}
                />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {user?.role === "Cohort" && searchedReviews?.length === 0 && (
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
        )}

        {/* Modal */}
        <div className="h-full">
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
        </div>
      </div>
    </div>
  );
}
