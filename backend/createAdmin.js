const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const mongoURI = 'mongodb+srv://snacksfactory:snacksfactory123@ac-qvldzpm-shard-00-00.dqq6rzc.mongodb.net/snacks-factory?retryWrites=true&w=majority';

// Admin credentials
const ADMIN_EMAIL = 'admin@snacksfactory.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_NAME = 'Admin';
const ADMIN_PHONE = '9999999999';

const createAdminUser = async () => {
  try {
    await mongoose.connect(mongoURI, { retryWrites: true, w: 'majority' });
    console.log('✓ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email:', ADMIN_EMAIL);
      if (!existingAdmin.isAdmin) {
        // Update to make admin if not already
        await User.findByIdAndUpdate(existingAdmin._id, { isAdmin: true });
        console.log('✅ Updated existing user to admin role');
      }
      process.exit(0);
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      phone: ADMIN_PHONE,
      password: ADMIN_PASSWORD,
      isAdmin: true,
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('📋 Admin Credentials:');
    console.log('─────────────────────────────────────────');
    console.log(`Email:    ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log(`Name:     ${ADMIN_NAME}`);
    console.log(`Phone:    ${ADMIN_PHONE}`);
    console.log('─────────────────────────────────────────\n');
    console.log('🎯 Usage:');
    console.log('1. Go to http://localhost:3000/auth');
    console.log('2. Login with above credentials');
    console.log('3. Click ⚙️ Admin in navbar to access admin dashboard\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdminUser();
