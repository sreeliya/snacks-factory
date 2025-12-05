# 🚀 Quick Start Guide

## Get Your Factory Management System Running in 10 Minutes!

---

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js v14+ installed → [Download](https://nodejs.org/)
- ✅ MongoDB Atlas account created → [Sign Up Free](https://www.mongodb.com/cloud/atlas)
- ✅ Git (optional, for version control)

---

## ⚡ 5-Minute Setup

### Step 1: MongoDB Atlas (2 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create account and cluster (free tier)
3. Create database user: `snacks_admin` with password
4. Allow IP access: `0.0.0.0/0` (for development)
5. Copy connection string → `mongodb+srv://snacks_admin:PASSWORD@cluster0.mongodb.net/snacks-factory`

**Detailed Guide:** See `MONGODB_SETUP.md`

### Step 2: Backend Setup (2 minutes)

```bash
# Terminal 1: Navigate to backend
cd backend

# Install packages
npm install

# Create .env file with your MongoDB connection
# Copy this into .env file:
# PORT=5000
# MONGO_URI=mongodb+srv://snacks_admin:YOUR_PASSWORD@cluster0.mongodb.net/snacks-factory

# Start server
npm start

# You should see:
# ✓ MongoDB connected: cluster0.mongodb.net
# ✓ Server running on http://localhost:5000
```

### Step 3: Frontend Setup (1 minute)

```bash
# Terminal 2: Navigate to frontend
cd frontend

# Install packages
npm install

# Start React app
npm start

# Browser opens automatically to http://localhost:3000
```

---

## 🎯 You're Ready!

Your application is now running:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Database:** MongoDB Atlas (cloud)

---

## 📝 First Steps in the App

### 1. Add a Raw Material
   - Click **Materials** in sidebar
   - Click **+ Add Material**
   - Fill form: Name, Quantity, Unit, Price
   - Click **Add**

### 2. Add Finished Goods
   - Click **Inventory**
   - Click **+ Add Item**
   - Fill form: Item Name, Quantity, Price
   - Click **Add**

### 3. Record Production
   - Click **Production**
   - Click **+ New Production**
   - Enter snack name and quantity
   - Click **Record**

### 4. Create an Order
   - Click **Orders**
   - Click **+ New Order**
   - Select item, quantity, customer name
   - Click **Create Order**
   - Stock automatically reduces!

### 5. View Dashboard
   - Click **Dashboard**
   - See all metrics and statistics

---

## 🔧 Useful Commands

### Backend
```bash
cd backend
npm start          # Start server
npm run dev        # Start with auto-reload (needs nodemon)
npm install        # Install dependencies
```

### Frontend
```bash
cd frontend
npm start          # Start React app (port 3000)
npm run build      # Create production build
npm install        # Install dependencies
```

### Database
```bash
# Test MongoDB connection
curl http://localhost:5000/api/health
# Should return: {"success":true,"message":"Server is running!"}
```

---

## 📂 Project Structure at a Glance

```
snacks-factory/
├── backend/           ← Node.js + Express + MongoDB
│   ├── models/        ← Database schemas
│   ├── controllers/   ← Business logic
│   ├── routes/        ← API endpoints
│   ├── config/        ← Database config
│   └── server.js      ← Main server file
│
└── frontend/          ← React application
    ├── src/
    │   ├── pages/     ← Dashboard, Materials, etc.
    │   ├── api/       ← Axios calls
    │   ├── styles/    ← CSS styling
    │   └── App.js     ← Main component
    └── public/        ← Static files
```

---

## 🎨 Features Overview

| Feature | Page | What It Does |
|---------|------|-------------|
| Dashboard | `/` | View factory statistics |
| Materials | `/materials` | Manage raw materials stock |
| Production | `/production` | Record snack production |
| Inventory | `/inventory` | Manage finished goods |
| Orders | `/orders` | Create and track orders |

---

## 🔌 API Endpoints Quick Reference

```
GET    /api/materials              # List all materials
POST   /api/materials              # Add material
GET    /api/production             # List all production
POST   /api/production             # Record production
GET    /api/inventory              # List inventory
POST   /api/inventory              # Add item
GET    /api/orders                 # List orders
POST   /api/orders                 # Create order
```

---

## ❓ Common Issues & Solutions

### "Cannot connect to MongoDB"
```
✓ Check connection string in .env file
✓ Verify MongoDB Atlas cluster is running
✓ Ensure IP 0.0.0.0/0 is whitelisted
✓ Check username/password are correct
```

### "Port 5000 already in use"
```bash
# Change PORT in backend/.env file to 5001
# Then restart backend
```

### "Frontend cannot reach backend API"
```
✓ Verify backend is running on port 5000
✓ Check that CORS is enabled (it is by default)
✓ Check browser console for errors
```

### "No data appears in tables"
```
✓ Add some test data first
✓ Check backend logs for errors
✓ Verify MongoDB connection is working
```

---

## 📚 Detailed Documentation

For more information, see:
- **Backend Setup:** `backend/SETUP.md`
- **MongoDB Guide:** `MONGODB_SETUP.md`
- **Frontend Details:** `frontend/README.md`
- **Main README:** `README.md`

---

## ✨ Next Steps

1. ✅ Get both servers running (following this guide)
2. 📝 Add some test data in the app
3. 📖 Read detailed documentation in `/docs`
4. 🚀 Deploy to production (see deployment guides)
5. 🔐 Set up authentication (future feature)

---

## 🎓 Learning Resources

- **Express.js:** https://expressjs.com/
- **React:** https://react.dev/
- **MongoDB:** https://docs.mongodb.com/
- **Axios:** https://axios-http.com/
- **REST APIs:** https://restfulapi.net/

---

## 🆘 Need Help?

1. Check the console for error messages
2. Review detailed docs in project folders
3. Check MongoDB Atlas cluster status
4. Verify all ports (3000, 5000) are not in use
5. Restart both frontend and backend servers

---

## 🎉 You're All Set!

Congratulations! Your Snacks Factory Management System is ready to use.

**Start managing your factory now:** http://localhost:3000

---

**Questions?** Check the comprehensive README.md and MONGODB_SETUP.md files for detailed information.

**Happy Factory Managing! 🏭✨**
