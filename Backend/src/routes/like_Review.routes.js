import express from 'express'
import { toggleLike } from '../controllers/like_Review.controllers.js';
import { isLoggedIn } from '../middlewares/auth.middlewares.js';
const likeReviewRouter = express.Router();
likeReviewRouter.post('/like-review',isLoggedIn, toggleLike)
export default likeReviewRouter;