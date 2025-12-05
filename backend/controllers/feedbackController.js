// ===================================
// FEEDBACK CONTROLLER
// ===================================

const Feedback = require('../models/Feedback');

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { rating, message } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!rating || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide rating and message',
      });
    }

    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be a number between 1 and 5',
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long',
      });
    }

    // Get user from token payload (already added by protect middleware)
    const { userName } = req.body;

    const feedback = await Feedback.create({
      userId,
      userName: userName || 'Anonymous',
      rating: ratingNum,
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback,
    });
  } catch (error) {
    console.error('Feedback creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback',
      error: error.message,
    });
  }
};

// Get all feedback (admin only)
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
      error: error.message,
    });
  }
};

// Get feedback by user (user's own feedback)
exports.getUserFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const feedback = await Feedback.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching your feedback',
      error: error.message,
    });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    res.status(200).json({
      success: true,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
      error: error.message,
    });
  }
};

// Update feedback status (admin only)
exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'reviewed', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be pending, reviewed, or archived',
      });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback status updated',
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating feedback status',
      error: error.message,
    });
  }
};

// Delete feedback (admin only)
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting feedback',
      error: error.message,
    });
  }
};

// Get feedback statistics (admin only)
exports.getFeedbackStats = async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const averageRating = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    const ratingDistribution = await Feedback.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      totalFeedback,
      averageRating: averageRating[0]?.avgRating || 0,
      ratingDistribution,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback statistics',
      error: error.message,
    });
  }
};
