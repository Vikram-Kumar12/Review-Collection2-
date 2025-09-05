import { useState, useEffect } from "react";
import { postReview } from "../../service/postReviewService.js";
import toast from "react-hot-toast";
export default function TextReviewForm() {
  const [reviewData, setReviewData] = useState({
    reviewType: "Text",
    content: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const minChars = 20;

  useEffect(() => {
    setCharCount(reviewData.content.length);
  }, [reviewData.content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    if (reviewData.content.trim().length < minChars) {
      setError(`Review must be at least ${minChars} characters.`);
      // Shake animation for error
      const textarea = document.querySelector("textarea");
      textarea.classList.add("animate-shake");
      setTimeout(() => textarea.classList.remove("animate-shake"), 500);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("reviewType", "Text");
    formData.append("content", reviewData.content);

    try {
      const response = await postReview(formData);
      toast.success(response?.data?.message || "Review created successfully!");
      setReviewData({
        reviewType: "",
        content: "",
      });
      setError("")
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Failed to create new review!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.metaKey) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="relative ">
        <textarea
          className="w-full p-4 border-2  border-gray-600 rounded-xl outline-none  transition-all duration-300 resize-none shadow-sm"
          placeholder="Share your experience in detail..."
          rows={6}
          name="content"
          value={reviewData.content}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={isSubmitting}
        />
        <div
          className={`absolute bottom-3 right-3 text-sm ${
            charCount < minChars ? "text-red-500" : "text-green-600"
          } transition-colors duration-300 bg-white px-2 py-1 rounded-full`}
        >
          {charCount}/{minChars}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-fadeIn">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-2">
        <p className="text-sm text-gray-400">
          Pro tip: Press ⌘ + Enter to submit
        </p>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none  ${
            isSubmitting
              ? "bg-orange-600 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white shadow-md cursor-pointer"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Submit Review"
          )}
        </button>
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
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
