// ===================================
// PRODUCTION MODEL
// ===================================
// Production records tracking

const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
  snackName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  materialUsed: [
    {
      materialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
      },
      quantityUsed: Number,
      unit: String,
    },
  ],
  status: {
    type: String,
    enum: ['Planned', 'In Progress', 'Completed'],
    default: 'Completed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Production', productionSchema);
