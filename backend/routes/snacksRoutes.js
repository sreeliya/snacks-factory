const express = require('express');
const {
  getAllSnacks,
  getSnackById,
  createSnack,
  updateSnack,
  deleteSnack,
} = require('../controllers/snacksController');

const router = express.Router();

// Public routes
router.get('/', getAllSnacks);
router.get('/:id', getSnackById);

// Admin routes (can be protected with middleware later)
router.post('/', createSnack);
router.put('/:id', updateSnack);
router.delete('/:id', deleteSnack);

module.exports = router;
