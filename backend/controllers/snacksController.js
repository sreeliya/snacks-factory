const Snacks = require('../models/Snacks');

// Get all snacks
exports.getAllSnacks = async (req, res) => {
  try {
    const snacks = await Snacks.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: snacks.length,
      data: snacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single snack
exports.getSnackById = async (req, res) => {
  try {
    const snack = await Snacks.findById(req.params.id);
    if (!snack) {
      return res.status(404).json({
        success: false,
        message: 'Snack not found',
      });
    }
    res.status(200).json({
      success: true,
      data: snack,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create snack
exports.createSnack = async (req, res) => {
  try {
    const snack = await Snacks.create(req.body);
    res.status(201).json({
      success: true,
      data: snack,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update snack
exports.updateSnack = async (req, res) => {
  try {
    const snack = await Snacks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!snack) {
      return res.status(404).json({
        success: false,
        message: 'Snack not found',
      });
    }
    res.status(200).json({
      success: true,
      data: snack,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete snack
exports.deleteSnack = async (req, res) => {
  try {
    const snack = await Snacks.findByIdAndDelete(req.params.id);
    if (!snack) {
      return res.status(404).json({
        success: false,
        message: 'Snack not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Snack deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
