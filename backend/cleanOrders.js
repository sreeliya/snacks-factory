const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CustomerOrder = require('./models/CustomerOrder');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

const cleanOrders = async () => {
  try {
    await connectDB();
    
    // Delete all orders to start fresh
    await CustomerOrder.deleteMany({});
    console.log('✓ Cleared all orders from database');
    
    process.exit(0);
  } catch (error) {
    console.error('Error cleaning orders:', error);
    process.exit(1);
  }
};

cleanOrders();
