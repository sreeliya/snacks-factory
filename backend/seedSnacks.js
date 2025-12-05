const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Snacks = require('./models/Snacks');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

const sampleSnacks = [
  {
    name: 'Banana Chips',
    description: 'Crispy, thinly sliced banana chips fried in coconut oil and lightly salted. A Kerala classic.',
    price: 60,
    image: 'https://ganguram.com/cdn/shop/files/banana-chips-1_f31bba50-74dc-45d6-b728-b2befe11cb2c.jpg?v=1756981450&width=480',
    category: 'Traditional Chips',
    packetTypes: [
      { size: 'Small', weight: '80g', priceMultiplier: 1 },
      { size: 'Medium', weight: '160g', priceMultiplier: 1.8 },
      { size: 'Family Pack', weight: '320g', priceMultiplier: 3.2 },
    ],
    inStock: true,
    rating: 4.7,
    ingredients: ['Raw Banana (Nendran)', 'Coconut Oil', 'Turmeric Powder', 'Salt'],
  },
  {
    name: 'Unniyappam',
    description: 'Sweet, deep-fried rice flour fritters flavored with jaggery, banana, and cardamom.',
    price: 85,
    image: 'https://vaya.in/recipes/wp-content/uploads/2018/11/Unniyappam-Recipe.jpg',
    category: 'Sweet Delicacy',
    packetTypes: [
      { size: 'Small Box', weight: '200g (6 pcs)', priceMultiplier: 1 },
      { size: 'Medium Box', weight: '400g (12 pcs)', priceMultiplier: 1.8 },
      { size: 'Large Box', weight: '800g (24 pcs)', priceMultiplier: 3.2 },
    ],
    inStock: true,
    rating: 4.5,
    ingredients: ['Rice Flour', 'Jaggery Syrup', 'Ripe Banana', 'Cardamom', 'Ghee', 'Coconut Pieces', 'Sesame Seeds'],
  },
  {
    name: 'Rose Cookies',
    description: 'Light, flaky, and buttery rose-shaped cookies, a delicate and classic Indian biscuit.',
    price: 50,
    image: 'https://www.flavoursofcalicut.com/cdn/shop/files/Rose_Cookies_small_e8f20538-686d-42fb-b117-f894e831a3c5.png?v=1747960092&width=720',
    category: 'Biscuits',
    packetTypes: [
      { size: 'Small', weight: '75g', priceMultiplier: 1 },
      { size: 'Medium', weight: '150g', priceMultiplier: 1.8 },
      { size: 'Large', weight: '300g', priceMultiplier: 3.2 },
    ],
    inStock: true,
    rating: 4.6,
    ingredients: ['Wheat Flour', 'Butter', 'Sugar', 'Milk Solids', 'Vanilla Essence', 'Baking Powder', 'Salt'],
  },
  {
    name: 'Pazhampori',
    description: 'Traditional Kerala banana fritters coated in jaggery and fried until golden. Sweet, soft inside and crisp outside.',
    price: 75,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Lh0m_94_ps8Pt4uVAQXG9338u2GbDqG4RQ&s',
    category: 'Banana Fritters',
    packetTypes: [
      { size: 'Serving (4 pcs)', weight: '200g', priceMultiplier: 1 },
      { size: 'Medium Box (8 pcs)', weight: '400g', priceMultiplier: 1.8 },
      { size: 'Party Box (15 pcs)', weight: '750g', priceMultiplier: 3.2 },
    ],
    inStock: true,
    rating: 4.6,
    ingredients: ['Ripe Plantain (Ethakka)', 'All-Purpose Flour (Maida)', 'Jaggery', 'Rice Flour', 'Cardamom', 'Oil for frying'],
  },
  {
    name: 'Tomato Murukku',
    description: 'Savory, crunchy snack made from rice flour and urad dal, infused with tangy tomato flavor.',
    price: 75,
    image: 'https://i0.wp.com/s3.ap-south-1.amazonaws.com/media.florafoods.in/wp-content/uploads/2022/04/24030214/Tomato-Chakli-1.jpg?fit=800%2C800&ssl=1',
    category: 'Savory Snacks',
    packetTypes: [
      { size: 'Small', weight: '80g', priceMultiplier: 1 },
      { size: 'Medium', weight: '160g', priceMultiplier: 1.8 },
      { size: 'Large', weight: '320g', priceMultiplier: 3.2 },
    ],
    inStock: true,
    rating: 4.4,
    ingredients: ['Rice Flour', 'Urad Dal Flour', 'Tomato Powder', 'Red Chili Powder', 'Salt', 'Asafoetida', 'Sesame Seeds'],
  },
  {
    name: 'Tapioca Chips',
    description: 'Thin, crispy chips made from deep-fried tapioca root, seasoned with spicy chili.',
    price: 70,
    image: 'https://buya1chips.com/cdn/shop/files/TapiocaChipsStickChilly.jpg?v=1742537701&width=2048',
    category: 'Traditional Chips',
    packetTypes: [
      { size: 'Small', weight: '50g', priceMultiplier: 1 },
      { size: 'Medium', weight: '150g', priceMultiplier: 2.5 },
      { size: 'Bulk', weight: '500g', priceMultiplier: 8 },
    ],
    inStock: true,
    rating: 4.6,
    ingredients: ['Tapioca (Cassava)', 'Coconut Oil', 'Salt', 'Chili Powder', 'Garlic Powder'],
  },
  {
    name: 'White Murukku',
    description: 'Classic plain murukku made with rice flour, known for its light texture and subtle flavor.',
    price: 65,
    image: 'https://rakskitchen.net/wp-content/uploads/2024/02/urad-dal-murukku.jpg',
    category: 'Savory Snacks',
    packetTypes: [
      { size: 'Small', weight: '60g', priceMultiplier: 1 },
      { size: 'Medium', weight: '150g', priceMultiplier: 2.2 },
      { size: 'Large', weight: '300g', priceMultiplier: 4 },
    ],
    inStock: true,
    rating: 4.5,
    ingredients: ['Rice Flour', 'Urad Dal Flour', 'Ghee', 'Salt', 'Cumin Seeds'],
  },
  {
    name: 'Jackfruit Chips',
    description: 'Sweet and crispy chips made from unripe jackfruit bulbs, fried and lightly salted.',
    price: 90,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwoO9-uTV7DN6pmyV0RuZb8Cj8KOZFYJDCOg&s',
    category: 'Exotic Chips',
    packetTypes: [
      { size: 'Small', weight: '70g', priceMultiplier: 1 },
      { size: 'Medium', weight: '150g', priceMultiplier: 1.9 },
      { size: 'Large', weight: '300g', priceMultiplier: 3.4 },
    ],
    inStock: true,
    rating: 4.7,
    ingredients: ['Raw Jackfruit', 'Coconut Oil', 'Salt', 'Turmeric'],
  },
];
const seedDB = async () => {
  try {
    await connectDB();
    
    // Clear existing snacks
    await Snacks.deleteMany({});
    console.log('Cleared existing snacks');
    
    // Insert sample snacks
    await Snacks.insertMany(sampleSnacks);
    console.log(`✓ Seeded ${sampleSnacks.length} snacks into database`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
