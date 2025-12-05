// ===================================
// DATABASE CONFIGURATION
// ===================================
// Connect to MongoDB Atlas
// Replace YOUR_ATLAS_CONNECTION_STRING with your actual connection string

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB Atlas Connection String Format:
    // mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://username:password@cluster0.mongodb.net/snacks-factory', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✓ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
