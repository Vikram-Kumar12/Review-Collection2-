import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
} from "../controllers/comment.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
const commentRouter = express.Router();

commentRouter.post("/post-comment", isLoggedIn, createComment);
commentRouter.post("/edit-comment", isLoggedIn, editComment);
commentRouter.post("/delete-comment", isLoggedIn, deleteComment);
export default commentRouter;
