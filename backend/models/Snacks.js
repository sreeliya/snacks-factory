const mongoose = require('mongoose');

const snacksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide snacks name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide snacks description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide snacks price'],
      min: 0,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300?text=Snacks',
    },
    category: {
      type: String,
      // Expanded enum to allow region-specific and custom categories used in seed data
      enum: [
        'Chips',
        'Cookies',
        'Crackers',
        'Dry Fruits',
        'Packaged Mix',
        'Traditional Chips',
        'Sweet Delicacy',
        'Biscuits',
        'Fried Biscuits (Sweet/Salt)',
        'Savory Snacks',
        'Exotic Chips',
        'Banana Fritters',
      ],
      default: 'Chips',
    },
    packetTypes: [
      {
        size: String,
        weight: String,
        priceMultiplier: {
          type: Number,
          default: 1,
        },
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5,
    },
    ingredients: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Snacks', snacksSchema);
