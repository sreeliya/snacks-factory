// ===================================
// PRODUCTION CONTROLLER
// ===================================
// Handle all production operations

const Production = require('../models/Production');
const Material = require('../models/Material');

// Get all production records
exports.getAllProduction = async (req, res) => {
  try {
    const productions = await Production.find()
      .populate('materialUsed.materialId')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: productions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single production record
exports.getProductionById = async (req, res) => {
  try {
    const production = await Production.findById(req.params.id).populate('materialUsed.materialId');
    if (!production) {
      return res.status(404).json({ success: false, message: 'Production record not found' });
    }
    res.json({ success: true, data: production });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create production record
exports.createProduction = async (req, res) => {
  try {
    const { snackName, quantity, date, materialUsed } = req.body;

    if (!snackName || !quantity) {
      return res.status(400).json({ success: false, message: 'Snack name and quantity are required' });
    }

    // Deduct materials from stock
    if (materialUsed && materialUsed.length > 0) {
      for (const material of materialUsed) {
        const materialItem = await Material.findById(material.materialId);
        if (!materialItem) {
          return res.status(404).json({ success: false, message: `Material ${material.materialId} not found` });
        }

        if (materialItem.quantity < material.quantityUsed) {
          return res
            .status(400)
            .json({ success: false, message: `Insufficient quantity of ${materialItem.name}` });
        }

        materialItem.quantity -= material.quantityUsed;
        await materialItem.save();
      }
    }

    const production = new Production({
      snackName,
      quantity,
      date: date || Date.now(),
      materialUsed: materialUsed || [],
      status: 'Completed',
    });

    await production.save();
    res.status(201).json({ success: true, data: production, message: 'Production recorded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update production record
exports.updateProduction = async (req, res) => {
  try {
    const { snackName, quantity, date, status, materialUsed } = req.body;

    const production = await Production.findByIdAndUpdate(
      req.params.id,
      { snackName, quantity, date, status, materialUsed },
      { new: true }
    ).populate('materialUsed.materialId');

    if (!production) {
      return res.status(404).json({ success: false, message: 'Production record not found' });
    }

    res.json({ success: true, data: production, message: 'Production updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete production record
exports.deleteProduction = async (req, res) => {
  try {
    const production = await Production.findByIdAndDelete(req.params.id);

    if (!production) {
      return res.status(404).json({ success: false, message: 'Production record not found' });
    }

    res.json({ success: true, message: 'Production record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
