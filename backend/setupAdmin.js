const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://snacksAdmin:fsd123@cluster0.dqq6rzc.mongodb.net/snacks-factory?retryWrites=true&w=majority';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  isAdmin: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

const createAdmin = async () => {
  try {
    await mongoose.connect(mongoURI, { retryWrites: true, w: 'majority' });
    console.log('Connected to MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@snacksfactory.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@snacksfactory.com',
      phone: '9999999999',
      password: hashedPassword,
      isAdmin: true,
    });

    console.log('\n✅ Admin created successfully!');
    console.log('\nCredentials:');
    console.log('Email: admin@snacksfactory.com');
    console.log('Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();
