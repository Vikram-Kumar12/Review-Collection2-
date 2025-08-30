import Comment from "../models/comment.models.js";
import Review from "../models/review.models.js";

export const createComment = async (req, res) => {
  try {
    const { content, reviewId } = req.body;
    if (!content || !reviewId) {
      return res.status(400).json({
        success: false,
        error: "All field required!",
      });
    }

    const userId = req.user._id;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res
        .status(404)
        .json({ success: false, error: "Review not found!" });
    }

    const comment = await Comment.create({
      reviewId,
      content,
        author: userId,
    });

    review.commentCount = review.commentCount + 1;
    await review.save();

    res.status(201).json({
      success: true,
      message: "Comment created successfully!",
      comment,
    });
  } catch (error) {
    console.error("Post comment Error:", error.message);
    res.status(500).json({ success: false, error: "Internal server error!" });
  }
};

export const editComment = async (req, res) => {
  try {
    const { content, reviewId, commentId } = req.body;
    if (!content || !reviewId || !commentId) {
      return res.status(400).json({
        success: false,
        error: "All field required!",
      });
    }
    const review = await Review.findById(reviewId);

    if (!review) {
      return res
        .status(404)
        .json({ success: false, error: "Review not found!" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: "Comment not found!" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, error: "Unauthorized to edit this comment!" });
    }

    comment.content = content;
    await comment.save();

    res.status(201).json({
      success: true,
      message: "Comment edit successfully!",
      comment,
    });
  } catch (error) {
    console.error("Edit comment Error:", error.message);
    res.status(500).json({ success: false, error: "Internal server error!" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { reviewId, commentId } = req.body;
    if (!reviewId || !commentId) {
      return res.status(400).json({
        success: false,
        error: "All field required!",
      });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, error: "Review not found!" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: "Comment not found!" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, error: "You are not authorized to delete this comment!" });
    }

    await comment.deleteOne();

    if (review && review.commentCount > 0) {
      review.commentCount = review.commentCount - 1;
      await review.save();
    }
    res.status(201).json({
      success: true,
      message: "Comment deleted successfully!",
    });
  } catch (error) {
    console.error("Edit comment Error:", error.message);
    res.status(500).json({ success: false, error: "Internal server error!" });
  }
};
