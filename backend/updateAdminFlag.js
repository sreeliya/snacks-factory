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

const updateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { retryWrites: true, w: 'majority' });
    console.log('Connected to MongoDB\n');

    const result = await User.updateOne(
      { email: 'admin@snacksfactory.com' },
      { $set: { isAdmin: true } }
    );

    console.log('Update result:', result);

    // Verify
    const admin = await User.findOne({ email: 'admin@snacksfactory.com' });
    console.log('\n✅ Admin user after update:');
    console.log('Name:', admin.name);
    console.log('Email:', admin.email);
    console.log('isAdmin:', admin.isAdmin);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

updateAdmin();
