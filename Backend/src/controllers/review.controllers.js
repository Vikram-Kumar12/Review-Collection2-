import cloudinary from "../config/cloudinary.js";
import Review from "../models/review.models.js";
import User from "../models/user.models.js";

export const createReview = async (req, res) => {
  try {
    const author = req.user._id;
    const user = await User.findById(author);
    if (user.role === "Public") {
      return res.status(400).json({
        success: false,
        error: "❌ Only cohort student are able to create a review!",
      });
    }

    const { reviewType, content } = req.body;
    if (!reviewType || !content) {
      return res.status(409).json({
        success: false,
        error: "Please provide all fields!",
      });
    }

    const imageUrls = [];
    let videoUrl = null;

    if (reviewType === "Tweet" && req.files?.images) {
      for (let img of req.files.images) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "reviews/images" },
            (error, result) => {
              if (error) return reject(error);
              return resolve(result);
            },
          );
          uploadStream.end(img.buffer);
        });

        imageUrls.push(result.secure_url); // ✅ Push only URL string
      }
    }

    if (reviewType === "Video" && req.files?.video) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "video",
              folder: "reviews/videos",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(req.files.video[0].buffer);
      });
      videoUrl = result.secure_url;
    }

    const newReview = new Review({
      reviewType,
      content,
      author,
      imageUrl: imageUrls.length ? imageUrls : undefined,
      videoUrl: videoUrl || undefined,
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review created successfully!",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error!" });
  }
};

export const getAllReview = async (req, res) => {
  try {
    const allReviewData = await Review.find()
      .sort({ createdAt: -1 })
      .populate("author", "name avatar email");
    res.status(200).json({
      message: "Review fetch successfully!",
      allReviewData,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error!" });
  }
};

export const getReviewByUser = async (req, res) => {
  try {
    const userId = req?.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user ID found in request.",
      });
    }
    const reviewData = await Review.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author");
    res.status(200).json({
      message: "Review fetch successfully!",
      reviewData,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error!" });
  }
};

export const deleteReviewById = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { reviewId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user ID found in request.",
      });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can delete reviews!",
      });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found in database!",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error!",
    });
  }
};
