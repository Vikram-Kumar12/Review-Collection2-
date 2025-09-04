import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  deleteReviewById,
  getAllReview,
} from "../../service/postReviewService.js";
import ReviewModal from "../Home/ReviewModal.jsx";

export default function AdminDashboard() {
  const [getAllReviewData, setGetAllReviewData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReview();
        setGetAllReviewData(response?.data?.allReviewData);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Internal server error!");
      }
    };
    fetchReviews();
  }, []);

  const filteredReviews =
    filter === "all"
      ? getAllReviewData
      : getAllReviewData?.filter((r) => r?.reviewType === filter);

  const searchedReviews = searchQuery
    ? filteredReviews.filter(
        (review) =>
          review?.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review?.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredReviews;

  const handleDelete = async (reviewId) => {
    try {
      const response = await deleteReviewById(reviewId);
      toast.success(response?.data?.message || "Review deleted successfully!");
      setGetAllReviewData((prev) =>
        prev.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      toast.error(error?.response?.data?.error || "Internal server error!");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
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
                Admin Dashboard
              </h1>
              <p className="text-gray-200 mt-2">
                Manage all reviews and content
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-600 text-white px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Administrator</span>
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

        {/* Admin Data */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="relative card-hover-bg overflow-hidden border-2 border-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-100">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-100">
                  {filteredReviews?.length}
                </p>
              </div>
            </div>
          </div>

          <div className="relative card-hover-bg overflow-hidden border-2 border-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-100">Text Reviews</p>
                <p className="text-2xl font-bold text-gray-100">
                  {
                    filteredReviews?.filter((r) => r?.reviewType === "Text")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="relative card-hover-bg overflow-hidden border-2 border-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-100">Active Cohorts</p>
                <p className="text-2xl font-bold text-gray-100">6</p>
              </div>
            </div>
          </div>
        </motion.div>

        {isMobile ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4"
          >
            <AnimatePresence>
              {searchedReviews?.map((review) => (
                <motion.div
                  key={review.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedReview(review)}
                  className=" rounded-2xl shadow-lg overflow-hidden border-2 hover:bg-gray-800 border-gray-700 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-orange-200 rounded-full flex items-center justify-center text-black font-medium overflow-hidden">
                        <img
                          src={review?.author?.avatar}
                          alt="avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-lg font-medium text-white">
                          {review?.author.name}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        review?.reviewType === "Text"
                          ? "bg-green-100 text-green-800"
                          : review?.reviewType === "Tweet"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {review?.reviewType}
                    </span>
                  </div>

                  <div className="text-sm text-gray-200 mb-3">
                    {review?.content?.slice(0, 400) +
                      (review.content.length > 400 ? "..." : "")}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {review?.createdAt?.slice(0, 10)}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(review._id);
                      }}
                      className="text-red-600 hover:text-red-700 bg-red-100 px-3 py-1 rounded-md text-xs transition-colors cursor-pointer"
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl shadow-lg overflow-hidden border border-gray-700"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Content
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 ">
                  <AnimatePresence>
                    {searchedReviews?.map((review, index) => (
                      <motion.tr
                        key={index}
                        variants={itemVariants}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-orange-200 rounded-full flex items-center justify-center text-black font-medium">
                              <img
                                src={review?.author?.avatar}
                                alt="avatar"
                                className="w-10 h-10 rounded-full"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {review?.author?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              review?.reviewType === "Text"
                                ? "bg-green-100 text-green-800"
                                : review?.reviewType === "Tweet"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {review?.reviewType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            onClick={() => setSelectedReview(review)}
                            className="text-sm text-white "
                          >
                            {review?.content?.slice(0, 350) +
                              (review.content.length > 350 ? "..." : "")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                          {review?.createdAt?.slice(0, 10)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(review._id)}
                            className="text-red-600 hover:text-red-700 bg-red-100 px-3 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            Delete
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {searchedReviews?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-800 rounded-2xl border border-gray-700 mt-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-orange-400"
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
            <h3 className="mt-2 text-sm font-medium text-gray-300">
              No reviews found
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </motion.div>
        )}

        {/* Modal */}
        <div className="h-full">
          <div className="h-full">
            {selectedReview && (
              <ReviewModal
                reviewData={selectedReview}
                onClose={() => setSelectedReview(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
