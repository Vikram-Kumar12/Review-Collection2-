import { useEffect, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { toggleLike } from "../../service/postReviewService.js";
import toast from "react-hot-toast";
import CommentReview from "./CommentReview.jsx";

const linkifyText = (text) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const hashtagRegex = /(#\w+)/g;

  const lines = text.split("\n");

  return lines.map((line, lineIndex) => (
    <div key={lineIndex}>
      {line.split(/(\s+)/).map((part, index) => {
        if (urlRegex.test(part)) {
          let url = part;
          if (!url.startsWith("http")) {
            url = `https://${url}`;
          }
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-words"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        else if (hashtagRegex.test(part)) {
          return (
            <span key={index} className="text-blue-400 font-medium">
              {part}
            </span>
          );
        }
        else {
          return <span key={index}>{part}</span>;
        }
      })}
      {lineIndex < lines.length - 1 && <br />}
    </div>
  ));
};

const ReviewModal = ({
  reviewData,
  onClose,
  onLikeUpdate,
  onCommentUpdate,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likesCount, setLikesCount] = useState(reviewData?.likesCount || 0);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isTweetWithImages =
    reviewData?.reviewType === "Tweet" && reviewData?.imageUrl?.length > 0;
  const goPrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? reviewData.imageUrl.length - 1 : prev - 1
    );
  };
  const goNext = () => {
    setCurrentImageIndex((prev) =>
      prev === reviewData.imageUrl.length - 1 ? 0 : prev + 1
    );
  };
  const toggleLikeHandler = async (id) => {
    try {
      const response = await toggleLike({
        targetType: "review",
        targetId: id,
      });
      const updatedLikesCount = response?.data?.likesCount;
      setLikesCount(updatedLikesCount);
      onLikeUpdate?.(reviewData._id, updatedLikesCount);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };
  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}`; // No /review/:id
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this site!",
          text: reviewData?.review,
          url: shareUrl,
        });
      } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch (err) {}
    }
  };

  return (
    <div className="fixed inset-0 z-50  bg-opacity-70 min:h-screen   px-4 bg-[rgba(37,26,18,0.6)] backdrop-blur-md py-10 flex  items-center justify-center">
      <div className="bg-black h-fit border border-gray-800 text-white lg:max-w-1/2 w-full max-h-[90vh]  rounded-lg p-4 shadow-lg relative overflow-y-auto scrollbar-hide ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl cursor-pointer"
        >
          ❌
        </button>

        {/* Card UI */}
        <div className="mb-4 mt-10 border border-gray-800 hover:border-orange-500 p-3 rounded-md">
          <div className="flex items-center mb-3 space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>

          <div className="flex items-center space-x-3 mb-2">
            <img
              src={reviewData?.author?.avatar}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-bold">{reviewData?.author?.name}</h4>
              <p className="text-xs text-gray-400">
                {reviewData?.createdAt?.slice(0, 10)}
              </p>
            </div>
          </div>

          <div className="text-white mb-3 whitespace-pre-wrap break-words">
            {linkifyText(reviewData?.content)}
          </div>

          {isTweetWithImages && (
            <div className="relative w-full h-auto mt-3">
              {reviewData.imageUrl.length === 1 ? (
                // Single Image Layout
                <img
                  src={reviewData.imageUrl[0]}
                  alt="tweet"
                  className="w-full rounded-md oobject-contain h-[350px]"
                />
              ) : (
                // Multiple Images with Slider
                <div className="relative">
                  <img
                    src={reviewData.imageUrl[currentImageIndex]}
                    alt={`tweet-${currentImageIndex}`}
                    className="w-full h-[350px] object-contain rounded-md"
                  />
                  {/* Navigation Buttons */}
                  <button
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60"
                  >
                    <IoIosArrowBack size={24} />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60"
                  >
                    <IoIosArrowForward size={24} />
                  </button>

                  <div className="flex justify-center mt-2 space-x-2">
                    {reviewData.imageUrl.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex
                            ? "bg-orange-500"
                            : "bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {reviewData?.reviewType === "Video" && reviewData?.videoUrl && (
            <video controls className="w-full rounded mt-2 h-[350px]">
              <source src={reviewData?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="flex items-center justify-between text-sm text-gray-300 mt-5">
            <div className="flex items-center justify-center gap-1">
              <span
                onClick={() => toggleLikeHandler(reviewData?._id)}
                className="px-2 py-2 text-xl hover:bg-gray-900 hover:scale-105 duration-300 w-fit rounded-full cursor-pointer"
              >
                ❤️
              </span>
              <span className="text-xl cursor-pointer">{likesCount}</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span
                onClick={handleShare}
                className="px-2 py-2 text-xl hover:bg-gray-900 hover:scale-105 duration-300 w-fit rounded-full cursor-pointer"
                title="Share this review"
              >
                <IoMdShare />
              </span>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="">
          <CommentReview
            reviewId={reviewData._id}
            onCommentUpdate={onCommentUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
