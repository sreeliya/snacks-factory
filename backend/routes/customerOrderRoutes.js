const express = require('express');
const {
  createCustomerOrder,
  getAllCustomerOrders,
  getCustomerOrderById,
  updateOrderStatus,
  deleteCustomerOrder,
  getUserOrderHistory,
} = require('../controllers/customerOrderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Specific routes first (before :id parameter routes)
router.post('/', protect, createCustomerOrder);
router.get('/history/my-orders', protect, getUserOrderHistory);
router.get('/', getAllCustomerOrders);
router.get('/:id', getCustomerOrderById);

// Admin routes
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteCustomerOrder);

module.exports = router;
