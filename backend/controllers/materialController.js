// ===================================
// MATERIAL CONTROLLER
// ===================================
// Handle all material operations

const Material = require('../models/Material');

// Get all materials
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.json({ success: true, data: materials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single material
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }
    res.json({ success: true, data: material });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create material
exports.createMaterial = async (req, res) => {
  try {
    const { name, quantity, unit, price } = req.body;

    if (!name || !quantity || !unit) {
      return res.status(400).json({ success: false, message: 'Name, quantity, and unit are required' });
    }

    const material = new Material({
      name,
      quantity,
      unit,
      price: price || 0,
    });

    await material.save();
    res.status(201).json({ success: true, data: material, message: 'Material added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update material
exports.updateMaterial = async (req, res) => {
  try {
    const { name, quantity, unit, price } = req.body;

    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { name, quantity, unit, price, updatedAt: Date.now() },
      { new: true }
    );

    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    res.json({ success: true, data: material, message: 'Material updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete material
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);

    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    res.json({ success: true, message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reduce material quantity
exports.reduceMaterialQuantity = async (req, res) => {
  try {
    const { id, quantityToReduce } = req.body;

    const material = await Material.findById(id);
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    if (material.quantity < quantityToReduce) {
      return res.status(400).json({ success: false, message: 'Insufficient material quantity' });
    }

    material.quantity -= quantityToReduce;
    await material.save();

    res.json({ success: true, data: material, message: 'Material quantity reduced' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
