import { useState, useEffect } from "react";
import TextReviewForm from "../components/postReview/TextReviewForm";
import TweetStyleReviewForm from "../components/postReview/TweetStyleReviewForm";
import VideoReviewForm from "../components/postReview/VideoReviewForm";

export default function PostReview() {
  const [reviewType, setReviewType] = useState("text");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleReviewTypeChange = (type) => {
    setIsMounted(false);
    setTimeout(() => {
      setReviewType(type);
      setIsMounted(true);
    }, 300);
  };

  return (
    <div className="lg:min-h-screen  pt-35 lg:pt-20 mt-0 lg:mt-20 ">
      <div className="max-w-2xl mx-auto border border-gray-700 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 transform hover:shadow-xl">
        <div className="p-6 md:p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#EA580C] to-[#FE9332] bg-clip-text text-transparent">
              Share Your Experience
            </h1>
            <p className="text-gray-400 mt-2">
              Choose how you'd like to post your review
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => handleReviewTypeChange("text")}
              className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                reviewType === "text"
                  ? "bg-[#FE9332] hover:bg-[#EA580C] cursor-pointer text-black shadow-lg"
                  : "bg-gray-500 text-white border border-gray-800 hover:bg-gray-600"
              }`}
            >
              <span className="mr-2 text-xl">✍️</span>
              <span>Text Review</span>
            </button>
            <button
              onClick={() => handleReviewTypeChange("tweet")}
              className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                reviewType === "tweet"
                  ? "bg-[#FE9332] hover:bg-[#EA580C] cursor-pointer text-black shadow-lg"
                  : "bg-gray-500 text-white border border-gray-800 hover:bg-gray-600"
              }`}
            >
              <span className="mr-2 text-xl">🐦</span>
              <span>Tweet Style</span>
            </button>
            <button
              onClick={() => handleReviewTypeChange("video")}
              className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                reviewType === "video"
                  ? "bg-[#FE9332] hover:bg-[#EA580C] cursor-pointer text-black shadow-lg"
                  : "bg-gray-500 text-white border border-gray-800 hover:bg-gray-600"
              }`}
            >
              <span className="mr-2 text-xl">🎥</span>
              <span>Video Review</span>
            </button>
          </div>

          {/* Animated Content Area */}
          <div className="relative min-h-[300px] overflow-hidden bg-zinc-800 rounded-xl  p-4 border border-gray-600">
            <div
              className={`transition-all duration-500 ${
                isMounted
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-4"
              }`}
            >
              {reviewType === "text" && <TextReviewForm />}
              {reviewType === "tweet" && <TweetStyleReviewForm />}
              {reviewType === "video" && <VideoReviewForm />}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
