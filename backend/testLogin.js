const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { retryWrites=true, w: 'majority' });
    console.log('Connected\n');

    const user = await User.findOne({ email: 'admin@snacksfactory.com' });
    
    if (user) {
      console.log('User found:');
      console.log('ID:', user._id);
      console.log('Name:', user.name);
      console.log('Email:', user.email);
      console.log('Phone:', user.phone);
      console.log('isAdmin:', user.isAdmin);
      console.log('\n--- Response that backend should return ---');
      console.log(JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      }, null, 2));
    } else {
      console.log('User not found');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

testLogin();
