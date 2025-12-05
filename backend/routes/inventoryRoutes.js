// ===================================
// INVENTORY ROUTES
// ===================================

const express = require('express');
const router = express.Router();
const {
  getAllInventory,
  getInventoryById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateStock,
  reduceStock,
} = require('../controllers/inventoryController');

// Routes
router.get('/', getAllInventory);
router.get('/:id', getInventoryById);
router.post('/', createInventoryItem);
router.put('/:id', updateInventoryItem);
router.delete('/:id', deleteInventoryItem);
router.post('/update-stock', updateStock);
router.post('/reduce-stock', reduceStock);

module.exports = router;
