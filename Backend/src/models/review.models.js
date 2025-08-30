import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    reviewType: {
      type: String,
      enum: ["Text", "Tweet", "Video"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: [String],
    videoUrl: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
const Review = mongoose.model("Review", reviewSchema);
export default Review;
