# Snacks Factory Backend Setup Guide

## 📌 Backend Configuration

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas Account
- npm or yarn

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Create .env File**
   Create a `.env` file in the backend folder:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/snacks-factory
   ```

3. **Get MongoDB Atlas Connection String**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create an account and cluster
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<username>` and `<password>` with your credentials

4. **Start the Server**
   ```bash
   npm start
   ```
   or with nodemon for development:
   ```bash
   npm run dev
   ```

### API Endpoints

#### Materials
- `GET /api/materials` - Get all materials
- `GET /api/materials/:id` - Get material by ID
- `POST /api/materials` - Create new material
- `PUT /api/materials/:id` - Update material
- `DELETE /api/materials/:id` - Delete material

#### Production
- `GET /api/production` - Get all production records
- `GET /api/production/:id` - Get production record
- `POST /api/production` - Create production record
- `PUT /api/production/:id` - Update production record
- `DELETE /api/production/:id` - Delete production record

#### Inventory
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/:id` - Get inventory item
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item
- `POST /api/inventory/update-stock` - Update stock
- `POST /api/inventory/reduce-stock` - Reduce stock

#### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/status/:status` - Get orders by status
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Folder Structure
```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── models/
│   ├── Material.js
│   ├── Production.js
│   ├── Inventory.js
│   └── Order.js
├── controllers/
│   ├── materialController.js
│   ├── productionController.js
│   ├── inventoryController.js
│   └── orderController.js
├── routes/
│   ├── materialRoutes.js
│   ├── productionRoutes.js
│   ├── inventoryRoutes.js
│   └── orderRoutes.js
├── server.js                 # Main Express server
├── package.json
└── .env                      # Environment variables (create this)
```

---

## 🔗 MongoDB Atlas Setup

1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster**: Select free tier
3. **Add Connection**: Network Access → Add your IP (0.0.0.0/0 for development)
4. **Create Database User**: Add username and password
5. **Get Connection String**: Connect → Connect your application
6. **Format**: `mongodb+srv://username:password@cluster0.mongodb.net/snacks-factory`

---

## ✅ Testing Backend

Once server is running, test with:
```
http://localhost:5000/api/health
```

You should see: `{"success":true,"message":"Server is running!"}`
