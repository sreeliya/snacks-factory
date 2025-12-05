// ===================================
// MAIN SERVER FILE
// ===================================
// Express server setup and API routes

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== ROUTES =====
// Import all route files
const authRoutes = require('./routes/authRoutes');
const materialRoutes = require('./routes/materialRoutes');
const productionRoutes = require('./routes/productionRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const snacksRoutes = require('./routes/snacksRoutes');
const customerOrderRoutes = require('./routes/customerOrderRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/snacks', snacksRoutes);
app.use('/api/customer-orders', customerOrderRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running!' });
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message,
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ API Health Check: http://localhost:${PORT}/api/health`);
});
