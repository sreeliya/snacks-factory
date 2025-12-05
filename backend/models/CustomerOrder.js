const mongoose = require('mongoose');

const customerOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      default: () => 'CO-' + Date.now(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        snackId: mongoose.Schema.Types.ObjectId,
        snackName: String,
        price: Number,
        quantity: Number,
        packetType: String,
        subtotal: Number,
      },
    ],
    customer: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Card', 'UPI', 'Bank Transfer', 'Cash on Delivery'],
      default: 'Cash on Delivery',
    },
    notes: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CustomerOrder', customerOrderSchema);
