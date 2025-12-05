// ===================================
// MATERIAL ROUTES
// ===================================

const express = require('express');
const router = express.Router();
const {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  reduceMaterialQuantity,
} = require('../controllers/materialController');

// Routes
router.get('/', getAllMaterials);
router.get('/:id', getMaterialById);
router.post('/', createMaterial);
router.put('/:id', updateMaterial);
router.delete('/:id', deleteMaterial);
router.post('/reduce-quantity', reduceMaterialQuantity);

module.exports = router;
