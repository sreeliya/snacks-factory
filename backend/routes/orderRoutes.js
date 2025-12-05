// ===================================
// ORDER ROUTES
// ===================================

const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getOrdersByStatus,
} = require('../controllers/orderController');

// Routes
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.get('/status/:status', getOrdersByStatus);
router.post('/', createOrder);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;
