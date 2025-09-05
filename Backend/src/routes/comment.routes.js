import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComment,
} from "../controllers/comment.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
const commentRouter = express.Router();

commentRouter.post("/post-comment", isLoggedIn, createComment);
commentRouter.get("/all-comment/:reviewId",getAllComment);
commentRouter.post("/edit-comment", isLoggedIn, editComment);
commentRouter.delete("/delete-comment", isLoggedIn, deleteComment);
export default commentRouter;
