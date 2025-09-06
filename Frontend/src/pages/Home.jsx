import React from "react";
import HeroSection from "../components/Home/HeroSection";
import ReviewCollectionBenefits from "../components/Home/ReviewColleactionBenefits";
import ListedReviewsSection from "../components/Home/ListedReviewsSection";
import Footer from "../components/Home/Footer";

const Home = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col">
      <HeroSection />
      <ReviewCollectionBenefits/>
      <ListedReviewsSection/>
      <Footer/>
    </div>
  );
};

export default Home;
