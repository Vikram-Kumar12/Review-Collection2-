import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  recipient: {                      
    // User who will receive the notification
    // when someone like and comment on review-post
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {                         
    // User who triggered the notification
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {                           
    // e.g., 'comment', 'like', 'new_review'
    type: String,
    enum: ['comment', 'like', 'new_review'],
    required: true
  },
  review: {                         
    // On which review this action happened
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
},{timestamps:true});

module.exports = mongoose.model('Notification', notificationSchema);
