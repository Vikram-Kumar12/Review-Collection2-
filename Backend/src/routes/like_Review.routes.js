import express from 'express'
import { toggleLike } from '../controllers/like_Review.controllers.js';
const likeReviewRouter = express.Router();
likeReviewRouter.post('/like-review',toggleLike)
export default likeReviewRouter;