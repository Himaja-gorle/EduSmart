const ForumPost = require('../models/ForumPost');
const ForumComment = require('../models/ForumComment');

// Create a new forum post/question
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, course, tags } = req.body;

    const post = await ForumPost.create({
      title,
      content,
      course,
      tags: tags || [],
      author: req.user.id
    });

    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// Fetch posts by course with search, filtering, and pagination
exports.getPostsByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { search, tag, sortBy = 'newest' } = req.query;

    let query = { course: courseId };

    if (tag) {
      query.tags = tag;
    }

    if (search) {
      query.$text = { $search: search };
    }

    let sortOptions = { isPinned: -1 };
    if (sortBy === 'upvotes') {
      sortOptions.upvoteCount = -1;
    } else if (sortBy === 'unanswered') {
      query.commentCount = 0;
      sortOptions.createdAt = -1;
    } else {
      sortOptions.createdAt = -1;
    }

    const posts = await ForumPost.find(query)
      .populate('author', 'name role')
      .sort(sortOptions);

    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    next(err);
  }
};

// Get single post along with its threaded comments tree
exports.getPostDetails = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await ForumPost.findById(postId).populate('author', 'name role');
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Fetch all comments for this post
    const comments = await ForumComment.find({ post: postId })
      .populate('author', 'name role')
      .sort({ createdAt: 1 });

    // Helper function to build nested comment tree
    const buildCommentTree = (parentCommentId = null) => {
      return comments
        .filter((c) => String(c.parentComment) === String(parentCommentId))
        .map((comment) => ({
          ...comment.toObject(),
          replies: buildCommentTree(comment._id)
        }));
    };

    const threadedComments = buildCommentTree(null);

    res.status(200).json({
      success: true,
      data: {
        post,
        comments: threadedComments
      }
    });
  } catch (err) {
    next(err);
  }
};

// Add a reply or nested reply to a post
exports.addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, parentCommentId } = req.body;

    const post = await ForumPost.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    if (parentCommentId) {
      const parent = await ForumComment.findById(parentCommentId);
      if (!parent) {
        return res.status(404).json({ success: false, message: 'Parent comment not found' });
      }
    }

    const comment = await ForumComment.create({
      post: postId,
      author: req.user.id,
      content,
      parentComment: parentCommentId || null
    });

    // Increment post comment count
    post.commentCount += 1;
    await post.save();

    const populatedComment = await comment.populate('author', 'name role');

    res.status(201).json({ success: true, data: populatedComment });
  } catch (err) {
    next(err);
  }
};

// Toggle upvote on a post
exports.togglePostUpvote = async (req, res, next) => {
  try {
    const post = await ForumPost.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const index = post.upvotes.indexOf(req.user.id);
    if (index === -1) {
      post.upvotes.push(req.user.id);
    } else {
      post.upvotes.splice(index, 1);
    }

    post.upvoteCount = post.upvotes.length;
    await post.save();

    res.status(200).json({ success: true, data: { upvoteCount: post.upvoteCount, upvotes: post.upvotes } });
  } catch (err) {
    next(err);
  }
};

// Toggle upvote on a comment
exports.toggleCommentUpvote = async (req, res, next) => {
  try {
    const comment = await ForumComment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    const index = comment.upvotes.indexOf(req.user.id);
    if (index === -1) {
      comment.upvotes.push(req.user.id);
    } else {
      comment.upvotes.splice(index, 1);
    }

    comment.upvoteCount = comment.upvotes.length;
    await comment.save();

    res.status(200).json({ success: true, data: { upvoteCount: comment.upvoteCount, upvotes: comment.upvotes } });
  } catch (err) {
    next(err);
  }
};

// Mark an answer as accepted (Faculty/Author only)
exports.markAcceptedAnswer = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await ForumComment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    const post = await ForumPost.findById(comment.post);
    if (post.author.toString() !== req.user.id && req.user.role !== 'faculty' && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to mark answer as solved' });
    }

    // Reset previous accepted answers
    await ForumComment.updateMany({ post: post._id }, { isAcceptedAnswer: false });

    comment.isAcceptedAnswer = true;
    await comment.save();

    post.isSolved = true;
    await post.save();

    res.status(200).json({ success: true, message: 'Answer marked as accepted', data: comment });
  } catch (err) {
    next(err);
  }
};
