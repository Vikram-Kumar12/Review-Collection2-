import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ReviewModal from "../components/Home/ReviewModal";
import useAuth from "../hooks/useAuth.js";
import ListedReviewCard from "../components/Home/ListedReviewCard.jsx";

const dummyReviews = [
  {
    user: "Hitesh Choudhary",
    time: "2 hours ago",
    review:
      "This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.",
    likes: 125,
    comments: 100,
    type: "text", // 👈 text only
  },
  {
    user: "Hitesh Choudhary",
    time: "1 hour ago",
    review:
      "This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.",
    image: "/assets/images/hiteshsir.png", // 👈 add image path
    likes: 45,
    comments: 20,
    type: "tweet", // 👈 text + image
  },
  {
    user: "Hitesh Choudhary",
    time: "30 minutes ago",
    review:
      "This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.This is a tweet-style post with an image.",
    video: "/assets/videos/sample.mp4", // 👈 add video path
    likes: 230,
    comments: 80,
    type: "video", // 👈 video + text
  },
];

const userData = {
  name: "Sarah Johnson",
  role: "cohort",
  cohort: "Web Development Cohort 2025",
  joinDate: "January 2025",
  reviewsCount: 12,
};

export default function UserDashboard() {
  const [reviews, setReviews] = useState(dummyReviews);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedReview, setSelectedReview] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredReviews =
    filter === "all" ? reviews : reviews.filter((r) => r.type === filter);

  const searchedReviews = searchQuery
    ? filteredReviews.filter(
        (review) =>
          review.review.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.user.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredReviews;

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center border border-gray-700"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mb-4"
          />
          <p className="text-orange-200">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

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
                {user?.user?.role === "Admin"
                  ? "Admin Dashboard"
                  : "My Learning Dashboard"}
              </h1>
              <p className="text-gray-200 mt-2">
                {user?.user?.role === "Admin"
                  ? "Manage all reviews and content"
                  : `Welcome back, ${user?.user?.name}! You've submitted ${user.reviewsCount} reviews so far.`}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-600 text-white px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {user?.user?.role === "Admin"
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
                onClick={() => setFilter("text")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === "text"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-200 text-black"
                }`}
              >
                Text Reviews
              </button>
              <button
                onClick={() => setFilter("tweet")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === "tweet"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-200 text-black"
                }`}
              >
                Tweet Reviews
              </button>
              <button
                onClick={() => setFilter("video")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  filter === "video"
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

        {/* Admin View */}
        {user?.user?.role === "Admin" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {/* relative card-hover-bg */}
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
                      {reviews.length}
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
                      {reviews.filter((r) => r.type === "text").length}
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
                  {searchedReviews.map((review) => (
                    <motion.div
                      key={review.id}
                      variants={itemVariants}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className=" rounded-2xl shadow-lg overflow-hidden border-2 hover:bg-gray-800 border-gray-700 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-orange-200 rounded-full flex items-center justify-center text-black font-medium">
                            {review.user.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-lg font-medium text-white">
                              {review.user}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            review.type === "text"
                              ? "bg-green-100 text-green-800"
                              : review.type === "tweet"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {review.type}
                        </span>
                      </div>

                      <div
                        onClick={() => setSelectedReview(review)}
                        className="text-sm text-gray-200 mb-3"
                      >
                        {review.review}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          {review.time}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(review.id)}
                          className="text-red-600 hover:text-red-700 bg-red-100 px-3 py-1 rounded-md text-xs transition-colors"
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
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
                    <tbody className="divide-y divide-gray-700">
                      <AnimatePresence>
                        {searchedReviews.map((review) => (
                          <motion.tr
                            key={review.id}
                            variants={itemVariants}
                            exit={{ opacity: 0 }}
                            className="hover:bg-gray-700"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 bg-orange-200 rounded-full flex items-center justify-center text-black font-medium">
                                  {review.user.charAt(0)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">
                                    {review.user}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  review.type === "text"
                                    ? "bg-green-100 text-green-800"
                                    : review.type === "tweet"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {review.type}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div
                                onClick={() => setSelectedReview(review)}
                                className="text-sm text-white "
                              >
                                {review.review}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                              {review.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(review.id)}
                                className="text-red-600 hover:text-red-700 bg-red-100 px-3 py-1 rounded-md transition-colors"
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

            {searchedReviews.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-gray-800 rounded-2xl border border-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400"
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
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </motion.div>
            )}
          </>
        )}

        {/* Stats for Student */}
        {user?.user?.role === "Cohort" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {searchedReviews.map((review) => (
                <motion.div
                  key={review.id}
                  variants={itemVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="border-2 border-gray-700 rounded-2xl shadow-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300  h-fit"
                >
                  <div
                    onClick={() => setSelectedReview(review)}
                    className="p-6"
                  >
                    <div className="flex  justify-between items-start mb-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full text-black bg-gray-200 ">
                        {review.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-300">
                        {review.time}
                      </span>
                    </div>

                    <p className="text-gray-100 mt-5 mb-4 ">{review.review}</p>

                    {review.image && (
                      <div className="mb-4 rounded-lg overflow-hidden border border-gray-700 hover:scale-105 duration-300">
                        <img
                          src={review.image}
                          alt="Review"
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}

                    {review.video && (
                      <div className="mb-4 rounded-lg overflow-hidden  border border-gray-700">
                        <video
                          controls
                          className="w-full h-full object-contain"
                        >
                          <source src={review.video} type="video/mp4" />
                        </video>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        {user?.user?.role === "Cohort" && searchedReviews.length === 0 && (
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
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
