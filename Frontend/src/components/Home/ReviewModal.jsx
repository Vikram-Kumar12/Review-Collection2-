import { useEffect, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ReviewModal = ({ reviewData, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

          <p className="text-sm leading-snug mb-4 mt-5">
            {reviewData?.content}
          </p>

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
            <span
              onClick={() => {
                alert("Like button click!");
              }}
              className="cursor-pointer"
            >
              ❤️ {reviewData?.likesCount}
            </span>
            <span>💬 {reviewData?.commentCount}</span>
            <span
              onClick={() => {
                alert("Share button click!");
              }}
              className="text-lg cursor-pointer"
            >
              {" "}
              <IoMdShare />
            </span>
          </div>
        </div>

        {/* Post Comment */}
        <div className="flex items-center space-x-2 border-t border-gray-600 pt-2">
          <textarea
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-gray-900 text-white p-2 rounded-md focus:outline-none"
          />
        </div>
        <button className="w-full text-center mt-4 px-4 py-2 bg-orange-500 text-black rounded-md font-bold">
          Post
        </button>

        <h1 className="mt-5 text-sm text-gray-600">All comments...</h1>
        {/* Comment Section */}
        <div className="space-y-3  overflow-y-auto mb-4 mt-5 scrollbar-hide">
          {/* Dummy comments */}
          {/* {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-800 p-2 rounded-md">
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src="/assets/images/hiteshsir.png"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-bold">{reviewData?.user}</h4>
                  <p className="text-xs text-gray-400">{reviewData?.time}</p>
                </div>
              </div>
              <p className="text-sm">{reviewData?.review}</p>
            </div>
          ))} */}
          <h1 className="text-xl flex items-center justify-center mt-5">
            No comment at
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
