import { useState, useRef } from "react";
import { postReview } from "../../service/postReviewService.js";
import toast from "react-hot-toast";
export default function VideoReviewForm() {
  const [videoData, setVideoData] = useState({
    reviewType: "Tweet",
    content: "",
    videoFile: "",
  });
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const minChars = 20;

  const handleVideoChange = (file) => {
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
      setError("");
      setUploadProgress(0);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setVideoPreview(e.target.result);
      reader.readAsDataURL(file);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 200);
    } else {
      setError("Please select a valid video file.");
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleVideoChange(e.target.files[0]);
      // Clear the input to allow selecting the same file again
      e.target.value = null;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleVideoChange(e.dataTransfer.files[0]);
    }
  };

  const removeVideo = () => {
    setVideo(null);
    setVideoPreview(null);
    setUploadProgress(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData({
      ...videoData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    if (!video || videoData.content.trim().length < minChars) {
      setError("Video and description (min 20 chars) are required.");
      // Shake animation for error
      const form = document.querySelector(".video-form-container");
      form.classList.add("animate-shake");
      setTimeout(() => form.classList.remove("animate-shake"), 500);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("reviewType", "Video");
    formData.append("content", videoData.content);
    formData.append("video", video); 

    try {
      const response = await postReview(formData);
      toast.success(response?.data?.message || "Review created successfully!");
      setVideoData({
        reviewType: "Tweet",
        content: "",
        videoFile: "",
      });
      setVideo(null);
      setVideoPreview(null);
      setError("");
      setUploadProgress(0);
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
    <div className="video-form-container space-y-6 animate-fadeIn">
      <div className=" rounded-2xl p-1 border border-gray-600 shadow-sm">
        <div className="p-4">
          {!video ? (
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 border-gray-500 hover:border-gray-400 hover:bg-zinc-700 `}
              onClick={() => fileInputRef.current.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="max-w-md mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-500 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-300">
                  Upload your video review
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Drag and drop your video here or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: MP4, MOV, AVI, etc.
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="video/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="bg-gray-800 rounded-xl overflow-hidden">
                <video
                  src={videoPreview}
                  className="w-full h-64 object-contain"
                  controls
                />
              </div>

              {/* Upload Progress */}
              {uploadProgress < 100 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              <button
                onClick={removeVideo}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-80 hover:opacity-100 transition-opacity duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Description Textarea */}
          <div className="mt-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-100 mb-2"
            >
              Video Description
            </label>
            <textarea
              id="content"
              className="w-full p-4 border-2 border-gray-600 rounded-xl outline-none transition-all duration-300 resize-none shadow-sm"
              placeholder="Share your experience in detail..."
              name="content"
              value={videoData.content}
              onChange={
                handleChange
              }
              onKeyPress={handleKeyPress}
              rows="4"
              disabled={isSubmitting}
            />
            <div
              className={`text-right text-sm mt-1 ${
                videoData.content.length < minChars
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {videoData.content.length}/{minChars}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-400 p-4">
          <p className="text-sm text-gray-500">
            Pro tip: Press ⌘ + Enter to submit
          </p>

          <button
            onClick={handleSubmit}
            disabled={
              isSubmitting || !video || videoData.content.length < minChars
            }
            className="px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white shadow-md"
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
