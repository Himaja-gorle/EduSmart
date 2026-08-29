const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const {
  createPost,
  getPostsByCourse,
  getPostDetails,
  addComment,
  togglePostUpvote,
  toggleCommentUpvote,
  markAcceptedAnswer
} = require('../controllers/forumController');

router.use(requireAuth);

router.post('/', createPost);
router.get('/course/:courseId', getPostsByCourse);
router.get('/:postId', getPostDetails);
router.post('/:postId/comments', addComment);
router.put('/:postId/upvote', togglePostUpvote);
router.put('/comments/:commentId/upvote', toggleCommentUpvote);
router.put('/comments/:commentId/accept', markAcceptedAnswer);

module.exports = router;
