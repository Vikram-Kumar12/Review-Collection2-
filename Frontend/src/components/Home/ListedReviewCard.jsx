import { useEffect, useRef, useState } from "react";
import { IoMdShare } from "react-icons/io";
const ListedReviewCard = ({
  user,
  authorImg,
  time,
  review,
  image,
  video,
  type,
  likes,
  comments,
  onClick,
}) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);



  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 cursor-pointer w-full  max-w-sm p-4 rounded-md "
    >
      {/* Terminal header */}
      <div className="flex  items-center space-x-2 mb-3 ">
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      </div>

      <div className="flex items-center space-x-3 mb-2 overflow-hidden">
        <img src={authorImg} alt="avatar" className="w-10 h-10 rounded-full" />
        <div>
          <h4 className="font-bold">{user}</h4>
          <p className="text-xs text-gray-400">{time?.slice(0, 10)}</p>
        </div>
      </div>
      <p className="text-sm leading-snug mb-4 mt-5">{review}</p>
      {type === "Tweet" && image && (
        <img
          src={image}
          alt="tweet"
          className="w-full object-contain rounded mt-2 h-[150px]"
        />
      )}
      {type === "Video" && video && (
        <video controls className="w-full rounded mt-2">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className=" flex items-center justify-between text-sm  text-gray-300 mt-5 ">
        <span
          onClick={(e) => {
            e.stopPropagation();
            alert("Like button click!");
          }}
        >
          ❤️ {likes}
        </span>

        <span>💬 {comments}</span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            alert("Share button click!");
          }}
          className="text-xl"
        >
          <IoMdShare />
        </span>
      </div>
    </div>
  );
};

export default ListedReviewCard;
