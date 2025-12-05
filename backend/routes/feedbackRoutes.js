// ===================================
// FEEDBACK ROUTES
// ===================================

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createFeedback,
  getAllFeedback,
  getUserFeedback,
  getFeedbackById,
  updateFeedbackStatus,
  deleteFeedback,
  getFeedbackStats,
} = require('../controllers/feedbackController');

// Public routes (authenticated users)
router.post('/', protect, createFeedback); // Create feedback
router.get('/user/my-feedback', protect, getUserFeedback); // Get user's own feedback (MUST be before /:id)
router.get('/stats/overview', protect, getFeedbackStats); // Get feedback stats (MUST be before /:id)

// Admin routes
router.get('/', protect, getAllFeedback); // Get all feedback
router.get('/:id', protect, getFeedbackById); // Get feedback by ID
router.put('/:id/status', protect, updateFeedbackStatus); // Update feedback status
router.delete('/:id', protect, deleteFeedback); // Delete feedback

module.exports = router;
