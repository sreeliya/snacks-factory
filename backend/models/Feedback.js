const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    userName: {
      type: String,
      required: [true, 'User name is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: [true, 'Feedback message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters long'],
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'archived'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
