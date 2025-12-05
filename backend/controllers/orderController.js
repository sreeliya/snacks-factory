// ===================================
// ORDER CONTROLLER
// ===================================
// Handle all order operations

const Order = require('../models/Order');
const Inventory = require('../models/Inventory');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('itemId').sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('itemId');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { itemId, quantity, customerName, notes } = req.body;

    if (!itemId || !quantity || !customerName) {
      return res.status(400).json({
        success: false,
        message: 'Item ID, quantity, and customer name are required',
      });
    }

    // Check if inventory exists
    const inventoryItem = await Inventory.findById(itemId);
    if (!inventoryItem) {
      return res.status(404).json({ success: false, message: 'Inventory item not found' });
    }

    // Check if enough stock
    if (inventoryItem.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${inventoryItem.quantity}`,
      });
    }

    // Reduce inventory stock
    inventoryItem.quantity -= quantity;
    await inventoryItem.save();

    // Create order
    const order = new Order({
      itemId,
      itemName: inventoryItem.itemName,
      quantity,
      customerName,
      status: 'Pending',
      notes: notes || '',
    });

    await order.save();
    res.status(201).json({ success: true, data: order, message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id, status, dispatchDate } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        status,
        dispatchDate: status === 'Shipped' ? dispatchDate || Date.now() : undefined,
      },
      { new: true }
    ).populate('itemId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order, message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Return stock if order was pending
    if (order.status === 'Pending') {
      const item = await Inventory.findById(order.itemId);
      if (item) {
        item.quantity += order.quantity;
        await item.save();
      }
    }

    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get orders by status
exports.getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const orders = await Order.find({ status }).populate('itemId').sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
