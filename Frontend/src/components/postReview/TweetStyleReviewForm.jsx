import { useState, useRef } from "react";
import { postReview } from "../../service/postReviewService.js";
import toast from "react-hot-toast";
export default function TweetStyleReviewForm() {
  const [tweetData, setTweetData] = useState({
    reviewType: "Tweet",
    content: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const maxChars = 1000;
  const minChars = 10;
  const maxImages = 4;

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= maxChars) {
      setTweetData({
        ...tweetData,
        [name]: value,
      });
      setError("");
    }
  };

  const handleImageChange = (files) => {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
      setError("Please select valid image files.");
      return;
    }

    // Check if adding these files would exceed the maximum
    if (images.length + validFiles.length > maxImages) {
      setError(`You can only upload up to ${maxImages} images.`);
      return;
    }

    setError("");

    // Add new images to state
    setImages((prev) => [...prev, ...validFiles]);

    // Create previews for new images
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleImageChange(e.target.files);
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
      handleImageChange(e.dataTransfer.files);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (tweetData.content.trim().length < minChars || images.length === 0) {
      setError(
        `Text (min ${minChars} chars) and at least one image are required.`
      );
      const form = document.querySelector(".tweet-form-container");
      form.classList.add("animate-shake");
      setTimeout(() => form.classList.remove("animate-shake"), 500);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("reviewType", "Tweet");
    formData.append("content", tweetData.content);
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await postReview(formData);
      toast.success(response?.data?.message || "Review created successfully!");
      setTweetData({
        reviewType: "",
        content: "",
      });
      setImages([]);
      setImagePreviews([]);
      setError("");
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

  const getGridClass = () => {
    if (imagePreviews.length === 1) return "grid-cols-1";
    if (imagePreviews.length === 2) return "grid-cols-2";
    if (imagePreviews.length === 3) return "grid-cols-2";
    return "grid-cols-2";
  };

  return (
    <div className="tweet-form-container space-y-6 animate-fadeIn">
      <div className=" rounded-2xl p-1 border-2 border-gray-600 shadow-sm">
        <div className="p-4">
          <textarea
            className="w-full  p-3 border-gray-600  border-2 rounded-md outline-none  text-lg placeholder-gray-500"
            placeholder="Share your experience in detail..."
            type="text"
            name="content"
            value={tweetData.content}
            onChange={handleTextChange}
            onKeyPress={handleKeyPress}
            rows="6"
            disabled={isSubmitting}
          />

          {imagePreviews.length > 0 && (
            <div className={`mt-4 grid ${getGridClass()} gap-2`}>
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative group rounded-2xl overflow-hidden"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded-2xl"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
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
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}/{imagePreviews.length}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-400 p-3 mt-10">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-full cursor-pointer transition-colors duration-200 ${
                isDragging ? "bg-blue-100" : "hover:bg-blue-50"
              } ${
                images.length >= maxImages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() =>
                images.length < maxImages && fileInputRef.current.click()
              }
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              title={
                images.length >= maxImages
                  ? `Maximum ${maxImages} images allowed`
                  : "Add images"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                multiple
                disabled={images.length >= maxImages}
              />
            </div>

            {images.length === 0 && (
              <span className="text-sm text-gray-500">
                {isDragging ? "Drop images here" : "Add images"}
              </span>
            )}
            {images.length > 0 && (
              <span className="text-sm text-gray-500">
                {images.length}/{maxImages} images
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div
              className={`text-sm ${
                tweetData.content.length > maxChars - 20
                  ? "text-yellow-500"
                  : "text-gray-400"
              } ${tweetData.content.length > maxChars ? "text-red-500" : ""}`}
            >
              {tweetData.content.length}/{maxChars}
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                tweetData.content.length < minChars ||
                tweetData.content.length > maxChars ||
                images.length === 0
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
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
                  Posting...
                </div>
              ) : (
                "Tweet"
              )}
            </button>
          </div>
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
