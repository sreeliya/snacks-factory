# 🏭 Snacks Factory Management System

A modern, full-stack web application for managing a snacks factory with comprehensive inventory, production, and order management features.

**Live Demo:** Dashboard → Materials → Production → Inventory → Orders

---

## ✨ Features

### 1. Raw Materials Management 📦
- Add/edit/delete raw materials
- Track quantities and units (kg, liters, pieces, bags, etc.)
- Monitor pricing
- Clean table UI with search and filter capabilities

### 2. Production Records ⚙️
- Record production with automatic material deduction
- Track production status (Planned, In Progress, Completed)
- Date-based tracking
- View complete production history

### 3. Finished Goods Inventory 📦
- Manage finished goods stock
- Add items with SKU tracking
- Update quantities in real-time
- Categorize products

### 4. Orders & Dispatch 🚚
- Create customer orders with automatic stock reduction
- Track order status (Pending → Processing → Shipped → Delivered)
- Order history and details
- Customer information tracking

### 5. Dashboard 📊
- Real-time statistics and metrics
- Overview of all factory operations
- Quick access to all modules

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router, Axios, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Cloud) |
| **API** | RESTful APIs with JSON |

---

## 📁 Project Structure

```
snacks-factory/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── models/
│   │   ├── Material.js
│   │   ├── Production.js
│   │   ├── Inventory.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── materialController.js
│   │   ├── productionController.js
│   │   ├── inventoryController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── materialRoutes.js
│   │   ├── productionRoutes.js
│   │   ├── inventoryRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js                    # Express server
│   ├── package.json
│   └── SETUP.md
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── api.js
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── pages/
    │   │   ├── Dashboard.js
    │   │   ├── Materials.js
    │   │   ├── Production.js
    │   │   ├── Inventory.js
    │   │   └── Orders.js
    │   ├── styles/
    │   │   └── index.css
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- MongoDB Atlas Account ([Sign Up](https://www.mongodb.com/cloud/atlas))
- npm or yarn

### Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create a new project

2. **Create a Cluster**
   - Click "Create Cluster"
   - Select free tier option
   - Choose your region
   - Click "Create Cluster" and wait for it to be ready

3. **Network Access**
   - Go to Network Access
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (for development)
   - Enter 0.0.0.0/0

4. **Database Access**
   - Go to Database Access
   - Click "Add New Database User"
   - Create username and password
   - Save credentials securely

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Format: `mongodb+srv://username:password@cluster0.mongodb.net/snacks-factory`

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo PORT=5000 > .env
echo MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/snacks-factory >> .env

# Start backend server
npm start
# or for development with auto-reload:
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend opens on:** `http://localhost:3000`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Materials Endpoints
```
GET    /materials              # Get all materials
GET    /materials/:id          # Get material by ID
POST   /materials              # Create new material
PUT    /materials/:id          # Update material
DELETE /materials/:id          # Delete material
POST   /materials/reduce-quantity  # Reduce material quantity
```

### Production Endpoints
```
GET    /production             # Get all records
GET    /production/:id         # Get record by ID
POST   /production             # Create production
PUT    /production/:id         # Update production
DELETE /production/:id         # Delete production
```

### Inventory Endpoints
```
GET    /inventory              # Get all items
GET    /inventory/:id          # Get item by ID
POST   /inventory              # Create item
PUT    /inventory/:id          # Update item
DELETE /inventory/:id          # Delete item
POST   /inventory/update-stock # Update stock quantity
POST   /inventory/reduce-stock # Reduce stock
```

### Orders Endpoints
```
GET    /orders                 # Get all orders
GET    /orders/:id             # Get order by ID
GET    /orders/status/:status  # Get orders by status
POST   /orders                 # Create order
PUT    /orders/:id             # Update order status
DELETE /orders/:id             # Delete order
```

---

## 🧪 Testing the Application

### Health Check
```bash
curl http://localhost:5000/api/health
# Response: {"success":true,"message":"Server is running!"}
```

### Sample API Call
```bash
curl -X GET http://localhost:5000/api/materials
```

### Using Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Import endpoints from API documentation above
3. Test CRUD operations

---

## 📝 Sample Data

To populate with sample data, you can use the API endpoints:

### Add Sample Material
```json
POST /api/materials
{
  "name": "Refined Flour",
  "quantity": 100,
  "unit": "kg",
  "price": 1.50
}
```

### Add Sample Inventory Item
```json
POST /api/inventory
{
  "itemName": "Salted Chips",
  "quantity": 500,
  "unit": "pieces",
  "price": 5.00,
  "sku": "SKU-001",
  "category": "Snacks"
}
```

### Create Sample Order
```json
POST /api/orders
{
  "itemId": "ITEM_ID_HERE",
  "quantity": 50,
  "customerName": "ABC Retail Store",
  "notes": "Priority delivery"
}
```

---

## 🎨 UI/UX Features

✅ **Modern Design** - Clean, professional interface  
✅ **Responsive** - Works on desktop, tablet, mobile  
✅ **Real-time Updates** - Instant feedback  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Visual loading indicators  
✅ **Form Validation** - Client-side validation  
✅ **Color-coded Status** - Easy status identification  
✅ **Intuitive Navigation** - Simple menu structure  

---

## 🔐 Security Considerations

- ✅ Input validation on frontend and backend
- ✅ MongoDB connection with authentication
- ✅ CORS enabled for local development
- ✅ Error handling to prevent data exposure
- ⚠️ **Note:** For production, implement JWT authentication and secure environment variables

---

## 🐛 Troubleshooting

### Backend Issues

| Problem | Solution |
|---------|----------|
| **MongoDB connection failed** | Check connection string and credentials in .env file |
| **Port 5000 already in use** | Change PORT in .env or kill existing process |
| **CORS errors** | Ensure CORS is enabled in server.js |

### Frontend Issues

| Problem | Solution |
|---------|----------|
| **Cannot connect to API** | Verify backend is running on port 5000 |
| **Blank page** | Check browser console for errors |
| **Styling not loading** | Clear browser cache and restart server |

### Database Issues

| Problem | Solution |
|---------|----------|
| **No data appears** | Check MongoDB Atlas cluster is running |
| **Connection timeout** | Verify IP whitelist and network access |

---

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Mongoose ODM](https://mongoosejs.com/)
- [Axios Documentation](https://axios-http.com/)

---

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Advanced analytics and reporting
- [ ] Batch operations
- [ ] Email notifications
- [ ] PDF export for reports
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Role-based access control (Admin, Manager, Staff)

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for efficient snacks factory management**

Last Updated: November 15, 2025
