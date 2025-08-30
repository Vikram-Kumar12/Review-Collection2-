import { useState } from "react";
import ListedReviewCard from "./ListedReviewCard";
import ReviewModal from "./ReviewModal";

const dummyData = [
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

const ListedReviewsSection = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  return (
    <section className="bg-black text-white py-10 px-4 min-h-scrren">
      <div className="text-center">
        <div className="relative inline-block mb-2">
          <h2 className="text-3xl md:text-4xl font-bold  text-white mb-10 relative z-10">
            Listed Reviews
          </h2>
          <div className="absolute inset-0 opacity-30 lg:opacity-30  blur-2xl z-0 bg-[#EA580C]"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6  ">
        {dummyData.map((item, index) => (
          <ListedReviewCard
            key={index}
            user={item.user}
            time={item.time}
            review={
              item.review.slice(0, 200) + (item.review.length > 20 ? "..." : "")
            }
            image={item.image}
            video={item.video}
            type={item.type}
            likes={item.likes}
            comments={item.comments}
            onClick={() => setSelectedReview(item)}
          />
        ))}
      </div>

      {/* Modal */}
      <div className="h-full">
        {selectedReview && (
          <ReviewModal
            reviewData={selectedReview}
            onClose={() => setSelectedReview(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ListedReviewsSection;
