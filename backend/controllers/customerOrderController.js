const CustomerOrder = require('../models/CustomerOrder');

// Create customer order from cart
exports.createCustomerOrder = async (req, res) => {
  try {
    const { items, customer, deliveryAddress, totalAmount, paymentMethod, notes } = req.body;
    const userId = req.user?.id; // Get userId from auth middleware

    console.log('📦 Order items received:', JSON.stringify(items, null, 2));

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart cannot be empty',
      });
    }

    if (!customer || !customer.name || !customer.email || !customer.phone) {
      return res.status(400).json({
        success: false,
        message: 'Customer details are required',
      });
    }

    // Ensure snackName is present in all items (for backward compatibility)
    const sanitizedItems = items.map((item) => ({
      ...item,
      snackName: item.snackName || item.name || `Item-${item.snackId}` || 'Snack Item',
    }));

    console.log('✅ Sanitized items:', JSON.stringify(sanitizedItems, null, 2));

    const order = await CustomerOrder.create({
      userId,
      items: sanitizedItems,
      customer,
      deliveryAddress,
      totalAmount,
      paymentMethod,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all customer orders
exports.getAllCustomerOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get customer order by ID
exports.getCustomerOrderById = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await CustomerOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete order
exports.deleteCustomerOrder = async (req, res) => {
  try {
    const order = await CustomerOrder.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get order history for logged-in user
exports.getUserOrderHistory = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const orders = await CustomerOrder.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
