import React from "react";

const benefits = [
  {
    title: "Share Reviews Instantly",
    desc: "Easily upload video or text reviews and share your thoughts with the developer community.",
    code: 'uploadReview({ type: "video" || "text", content })',
    image: "https://placehold.co/40x40",
  },
  {
    title: "Discover Honest Feedback",
    desc: "Browse real reviews from real devs—no fluff, just straight-up experiences.",
    code: "const reviews = fetch('/api/reviews?authentic=true')",
    image: "https://placehold.co/40x40",
  },
  {
    title: "Engage with Comments",
    desc: "Join the conversation. Ask questions, add insights, or just appreciate valuable reviews.",
    code: "review.addComment({ user, message })",
    image: "https://placehold.co/40x40",
  },
  {
    title: "Like What You Love",
    desc: "Tap into what others are enjoying. Like your favorite reviews to show support.",
    code: "if (youLoveIt) review.like()",
    image: "https://placehold.co/40x40",
  },
  {
    title: "Simple, Clean UI",
    desc: "Enjoy a smooth and distraction-free interface designed with developers in mind.",
    code: "<UI minimal clean responsive />",
    image: "https://placehold.co/40x40",
    highlight: true,
  },
  {
    title: "Built for Devs, by Devs",
    desc: "This platform is crafted by the community for the community. Feedback? We’re listening.",
    code: "community.build({ devs: true, feedback: 'welcome' })",
    image: "https://placehold.co/40x40",
  },
];

const BenefitCard = ({ title, desc, code, image }) => (
  <div className="relative card-hover-bg bg-black overflow-hidden rounded-xl border border-[#ff8000]/30 p-3 text-white transition-transform duration-300 hover:scale-[1.05]">
    {/* Card Content */}
    <div className="relative z-10">
      <div className="flex gap-2 mb-3">
        <img
          src={image}
          alt="icon"
          className="w-10 h-10 rounded-md object-cover"
        />
        <div className="flex flex-col items-start justify-start">
          <h3 className="text-md font-semibold text-orange-400">{title}</h3>
          <p className="text-gray-400 text-xs text-start">{desc}</p>
        </div>
      </div>
      <hr className="mb-2 text-gray-600" />
      <div className="bg-[#1a1a1a] text-xs text-blue-300 font-mono px-3 py-2 rounded-md w-full overflow-x-auto">
        {code}
      </div>
    </div>
  </div>
);

const ReviewCollectionBenefits = () => {
  return (
    <div className="bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="relative inline-block mb-2">
          <h2 className="text-3xl md:text-4xl font-bold  text-white relative z-10">
            Features of ReviewCollection
          </h2>
          <div className="absolute inset-0 opacity-30 lg:opacity-70  blur-2xl z-0 bg-[#EA580C]"></div>
        </div>

        <p className="text-gray-400 mb-10">
          Everything you need to transform learning into real-world skills.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <BenefitCard key={i} {...b} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCollectionBenefits;


