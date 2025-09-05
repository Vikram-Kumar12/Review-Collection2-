import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import {
  createComment,
  deleteComment,
  getAllComment,
} from "../../service/postReviewService.js";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.js";

const linkifyText = (text) => {
  if (!text) return null;
  // Improved URL regex to better detect URLs
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const hashtagRegex = /(#\w+)/g;

  // First, split by newlines to preserve line breaks
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => (
    <div key={lineIndex}>
      {line.split(/(\s+)/).map((part, index) => {
        // Check if part is a URL
        if (urlRegex.test(part)) {
          let url = part;
          if (!url.startsWith("http")) {
            url = `https://${url}`;
          }
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-words"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        // Check if part is a hashtag
        else if (hashtagRegex.test(part)) {
          return (
            <span key={index} className="text-blue-400 font-medium">
              {part}
            </span>
          );
        }
        // Regular text
        else {
          return <span key={index}>{part}</span>;
        }
      })}
      {lineIndex < lines.length - 1 && <br />}
    </div>
  ));
};

const CommentReview = ({ reviewId, onCommentUpdate }) => {
  const [postComment, setPostComment] = useState({
    reviewId: reviewId,
    content: "",
  });
  const [getAllCommentData, setGetAllCommentData] = useState([]);
  const [editId, setEditId] = useState(null);
  const dropdownRef = useRef(null);
  const [submit, setSubmit] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEditId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!postComment.content.trim() || postComment.content.length < 20) {
      alert("Comment should be at least 20 characters!");
      return;
    }
    setSubmit(true);
    try {
      const res = await createComment(postComment);
      const response = await getAllComment(reviewId);
      setGetAllCommentData(response?.data?.allComment || []);
      onCommentUpdate(reviewId, res?.data?.commentCount);
      setPostComment({
        reviewId: reviewId,
        content: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setSubmit(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const resp = await deleteComment({
        commentId: commentId,
        reviewId: reviewId,
      });
      const response = await getAllComment(reviewId);
      setGetAllCommentData(response?.data?.allComment || []);
      onCommentUpdate(reviewId, resp?.data?.commentCount);
      toast.success(resp?.data?.message || "Comment deleted successfully!");
    } catch (error) {
      toast.error(error?.resp?.data?.error || "Comment delete request failed!");
    }
  };

  useEffect(() => {
    if (!reviewId) return;
    const fetchComment = async () => {
      try {
        const response = await getAllComment(reviewId);
        setGetAllCommentData(response?.data?.allComment || []);
      } catch (error) {}
    };
    fetchComment();
  }, []);

  return (
    <div className="pt-5">
      <div className="flex items-center space-x-2 border-t border-gray-600 pt-2">
        <textarea
          type="text"
          id="content"
          name="content"
          value={postComment.content}
          onChange={handleChange}
          placeholder="Add a comment..."
          className="flex-1 bg-gray-900 text-white p-2 rounded-md focus:outline-none"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!postComment.content.trim()}
        className={`w-full text-center mt-4 px-4 py-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-black rounded-md font-bold ${
          !postComment.content.trim() ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {submit ? "Posting..." : "Post"}
      </button>

      <h1 className="mt-5 text-sm text-gray-600">All comments...</h1>
      <div className="w-full h-full space-y-3  overflow-y-auto mb-4 mt-5 scrollbar-hide">
        {getAllCommentData?.length !== 0 ? (
          <>
            {getAllCommentData?.map((comment) => (
              <div key={comment._id} className="bg-gray-800 p-2 rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 mb-2 overflow-hidden">
                    <img
                      src={comment?.author?.avatar}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold">
                        {comment?.author?.name || "Vikram Kumar"}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {comment?.createdAt?.slice(0, 10) || "19-05-2005"}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    {user?._id === comment?.author?._id && (
                      <span
                        onClick={() =>
                          setEditId(editId === comment._id ? null : comment._id)
                        }
                        className="text-2xl text-gray-200 hover:text-gray-400 cursor-pointer"
                      >
                        <HiDotsHorizontal />
                      </span>
                    )}

                    {editId === comment._id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 top-0 rounded-md bg-gray-700 px-4 py-4 "
                      >
                        <div
                          onClick={() => handleDelete(comment._id)}
                          className="flex items-center gap-1 text-xl text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <span>
                            <MdDelete />
                          </span>
                          <span>Delete</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-white mb-3 whitespace-pre-wrap break-words">
                  {linkifyText(comment.content)}
                </div>
              </div>
            ))}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 border-2 border-gray-800 rounded-2xl shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-100">
              No comments yet
            </h3>
            <p className="mt-1 text-sm text-gray-300">
              Get started by submitting your first comment!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommentReview;
