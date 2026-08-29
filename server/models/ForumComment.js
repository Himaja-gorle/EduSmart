const mongoose = require('mongoose');

const forumCommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumPost',
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: [true, 'Comment content is required']
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumComment',
      default: null // null for top-level comments, populated for nested replies
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    upvoteCount: {
      type: Number,
      default: 0
    },
    isAcceptedAnswer: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ForumComment', forumCommentSchema);
