const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const materialController = require('../controllers/materialController');

router.use(protect);

router.post(
  '/',
  authorize('faculty', 'admin'),
  upload.single('file'),
  materialController.createMaterial
);
router.get('/course/:courseId', materialController.getMaterialsByCourse);
router.patch('/:id/bookmark', materialController.toggleBookmark);
router.delete('/:id', authorize('faculty', 'admin'), materialController.deleteMaterial);

module.exports = router;
