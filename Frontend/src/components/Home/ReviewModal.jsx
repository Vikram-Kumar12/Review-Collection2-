import { useEffect } from "react";
import { IoMdShare } from "react-icons/io";
const ReviewModal = ({ reviewData, onClose }) => {
  
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
              src="/assets/images/hiteshsir.png"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-bold">{reviewData.user}</h4>
              <p className="text-xs text-gray-400">{reviewData.time}</p>
            </div>
          </div>
          <p className="text-sm leading-snug mb-4">{reviewData.review}</p>

          {reviewData.type === "tweet" && reviewData.image && (
            <div className="w-full h-[400px]">
              <img
                src={reviewData.image}
                alt="tweet"
                className="w-full object-cover rounded mt-2 h-full"
              />
            </div>
          )}

          {reviewData.type === "video" && reviewData.video && (
            <video controls className="w-full rounded mt-2 h-[350px]">
              <source src={reviewData.video} type="video/mp4" />
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
              ❤️ {reviewData.likes}
            </span>
            <span>💬 {reviewData.comments}</span>
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
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-800 p-2 rounded-md">
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src="/assets/images/hiteshsir.png"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-bold">{reviewData.user}</h4>
                  <p className="text-xs text-gray-400">{reviewData.time}</p>
                </div>
              </div>
              <p className="text-sm">{reviewData.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
