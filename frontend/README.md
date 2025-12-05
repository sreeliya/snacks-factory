# 🏭 Snacks Factory Management System - Frontend

A modern React-based frontend for managing a snacks factory with intuitive UI and responsive design.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
```

## 📋 Pages & Features

### 1. 📊 Dashboard
- Overview of factory metrics
- Total materials, inventory, production records, and pending orders
- Quick statistics and helpful guide

### 2. 📦 Materials
- View all raw materials
- Add new materials (name, quantity, unit, price)
- Edit existing materials
- Delete materials
- Real-time updates

### 3. ⚙️ Production
- Record production entries
- Track snack production with dates and status
- Manage production status (Planned, In Progress, Completed)
- View all production history

### 4. 📦 Inventory
- Manage finished goods inventory
- Add new items to stock
- Update inventory quantities
- Track item categories and SKUs
- Monitor pricing

### 5. 🚚 Orders & Dispatch
- Create customer orders
- Automatic stock deduction
- Update order status (Pending → Processing → Shipped → Delivered)
- Track order history
- Delete orders with stock restoration

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with intuitive navigation
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Color-coded Status**: Visual indicators for different states
- **Form Validation**: Client-side validation for all inputs
- **Real-time Updates**: Instant feedback after actions
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during data fetching

## 🔌 API Configuration

The app connects to the backend API at `http://localhost:5000/api`

Make sure your backend is running before starting the frontend.

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── api.js           # Axios API calls
│   ├── components/
│   │   └── Navbar.js        # Navigation component
│   ├── pages/
│   │   ├── Dashboard.js     # Dashboard page
│   │   ├── Materials.js     # Materials management
│   │   ├── Production.js    # Production records
│   │   ├── Inventory.js     # Inventory management
│   │   └── Orders.js        # Orders & dispatch
│   ├── styles/
│   │   └── index.css        # Global styles
│   ├── App.js               # Main app component
│   └── index.js             # React entry point
└── package.json
```

## 🎯 Key Technologies

- **React 18**: Modern UI library
- **React Router v6**: Client-side routing
- **Axios**: HTTP client for API calls
- **CSS3**: Modern styling with flexbox and grid

## 💡 Tips

1. Make sure backend server is running on port 5000
2. MongoDB Atlas connection must be configured in backend
3. Use the dashboard to get an overview of operations
4. Materials should be added before creating production records
5. Inventory items should exist before creating orders

## 🐛 Troubleshooting

**API Connection Issues:**
- Ensure backend is running on port 5000
- Check that CORS is enabled in backend
- Verify MongoDB connection string

**Styling Issues:**
- Clear browser cache
- Restart development server

**Data Not Loading:**
- Check browser console for errors
- Verify backend API endpoints are working
- Test with `http://localhost:5000/api/health`

---

Built with ❤️ for efficient factory management
