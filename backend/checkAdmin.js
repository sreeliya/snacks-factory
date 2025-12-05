const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  isAdmin: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { retryWrites: true, w: 'majority' });
    console.log('Connected to MongoDB\n');

    const admin = await User.findOne({ email: 'admin@snacksfactory.com' });
    
    if (admin) {
      console.log('✅ Admin user found:');
      console.log('Name:', admin.name);
      console.log('Email:', admin.email);
      console.log('isAdmin:', admin.isAdmin);
      console.log('ID:', admin._id);
    } else {
      console.log('❌ Admin user NOT found');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkAdmin();
