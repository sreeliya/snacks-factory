const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;


const customerOrderSchema = new mongoose.Schema({
  orderNumber: String,
  userId: mongoose.Schema.Types.ObjectId,
  items: [{
    snackId: mongoose.Schema.Types.ObjectId,
    snackName: String,
    price: Number,
    quantity: Number,
    packetType: String,
    subtotal: Number,
  }],
  customer: Object,
  deliveryAddress: Object,
  totalAmount: Number,
  status: String,
  paymentMethod: String,
  notes: String,
  createdAt: Date,
});

const CustomerOrder = mongoose.model('CustomerOrder', customerOrderSchema);

mongoose.connect(mongoURI, { retryWrites: true, w: 'majority' })
  .then(async () => {
    console.log('✓ Connected to MongoDB');
    const orders = await CustomerOrder.find().limit(3).sort({ createdAt: -1 });
    console.log('\n📦 Recent Orders:');
    orders.forEach((order, i) => {
      console.log(`\n--- Order ${i+1}: ${order.orderNumber} ---`);
      console.log('Items:', JSON.stringify(order.items, null, 2));
    });
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });

