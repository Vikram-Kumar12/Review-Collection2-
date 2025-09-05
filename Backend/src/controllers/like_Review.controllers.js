import Comment from "../models/comment.models.js";
import Review from "../models/review.models.js";

export const toggleLike = async (req, res) => {  
  try {
    const { targetId, targetType } = req.body;
    const userId = req.user._id;
    if(!userId){
      return res.status(400).json({
        success:false,
        error:"Please login first!"
      })
    }

    if (!targetId || !['review', 'comment'].includes(targetType)) {
      return res.status(400).json({
        success: false,
        error: "Invalid request parameters.",
      });
    }

    const Model = targetType === 'review' ? Review : Comment;
    const target = await Model.findById(targetId);

    if (!target) {
      return res.status(404).json({
        success: false,
        error: `${targetType} not found.`,
      });
    }

    const alreadyLiked = target.likes.includes(userId);

    if (alreadyLiked) {
      target.likes.pull(userId);
      target.likesCount -= 1;
    } else {
      target.likes.push(userId);
      target.likesCount += 1;
    }

    await target.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? "Unliked successfully." : "Liked successfully.",
      likesCount: target.likesCount,
    });

  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error." });
  }
};
