import express from "express";
import { createReview } from "../controllers/review.controllers.js";
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
export default reviewRouter;
