// ===================================
// INVENTORY MODEL
// ===================================
// Finished goods inventory

const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    default: 'pieces',
  },
  price: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
  },
  category: {
    type: String,
    default: 'General',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Inventory', inventorySchema);
