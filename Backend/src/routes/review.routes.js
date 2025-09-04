import express from "express";
import {
  createReview,
  deleteReviewById,
  getAllReview,
  getReviewByUser,
} from "../controllers/review.controllers.js";
import { upload } from "../middlewares/mullter.middlewares.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
const reviewRouter = express.Router();

reviewRouter.post(
  "/create-review",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  isLoggedIn,
  createReview,
);
reviewRouter.get("/get-all-review", getAllReview);
reviewRouter.get("/get-review-by-user", isLoggedIn, getReviewByUser);
reviewRouter.delete("/delete-review/:reviewId", isLoggedIn, deleteReviewById);
export default reviewRouter;
