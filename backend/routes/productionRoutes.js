// ===================================
// PRODUCTION ROUTES
// ===================================

const express = require('express');
const router = express.Router();
const {
  getAllProduction,
  getProductionById,
  createProduction,
  updateProduction,
  deleteProduction,
} = require('../controllers/productionController');

// Routes
router.get('/', getAllProduction);
router.get('/:id', getProductionById);
router.post('/', createProduction);
router.put('/:id', updateProduction);
router.delete('/:id', deleteProduction);

module.exports = router;
