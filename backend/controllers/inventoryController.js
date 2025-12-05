// ===================================
// INVENTORY CONTROLLER
// ===================================
// Handle all inventory operations

const Inventory = require('../models/Inventory');

// Get all inventory items
exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single inventory item
exports.getInventoryById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inventory item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add inventory item
exports.createInventoryItem = async (req, res) => {
  try {
    const { itemName, quantity, unit, price, sku, category } = req.body;

    if (!itemName || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Item name and quantity are required' });
    }

    const item = new Inventory({
      itemName,
      quantity,
      unit: unit || 'pieces',
      price: price || 0,
      sku,
      category: category || 'General',
    });

    await item.save();
    res.status(201).json({ success: true, data: item, message: 'Inventory item added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update inventory item
exports.updateInventoryItem = async (req, res) => {
  try {
    const { itemName, quantity, unit, price, sku, category } = req.body;

    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      { itemName, quantity, unit, price, sku, category, updatedAt: Date.now() },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, message: 'Inventory item not found' });
    }

    res.json({ success: true, data: item, message: 'Inventory item updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete inventory item
exports.deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Inventory item not found' });
    }

    res.json({ success: true, message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update stock
exports.updateStock = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inventory item not found' });
    }

    item.quantity = quantity;
    item.updatedAt = Date.now();
    await item.save();

    res.json({ success: true, data: item, message: 'Stock updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reduce stock
exports.reduceStock = async (req, res) => {
  try {
    const { id, quantityToReduce } = req.body;

    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inventory item not found' });
    }

    if (item.quantity < quantityToReduce) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    item.quantity -= quantityToReduce;
    await item.save();

    res.json({ success: true, data: item, message: 'Stock reduced successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
