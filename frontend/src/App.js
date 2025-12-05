import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import AdminOrders from './pages/AdminOrders';
import AdminOrderDetail from './pages/AdminOrderDetail';
import Feedback from './pages/Feedback';
import AdminFeedback from './pages/AdminFeedback';
import './styles/index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { user } = useAuth();

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  // If authenticated but admin, redirect to admin dashboard
  if (isAuthenticated && user?.isAdmin) {
    return <Navigate to="/admin/orders" replace />;
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

// Admin Protected Route Component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect admin to dashboard on initial load
  useEffect(() => {
    // Only redirect admins when landing on the root path to avoid
    // forcing navigation away from other admin pages like /admin/feedback
    if (isAuthenticated && user?.isAdmin && location.pathname === '/') {
      navigate('/admin/orders', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && user?.isAdmin ? (
              <Navigate to="/admin/orders" replace />
            ) : (
              <Welcome />
            )
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/order/:orderId"
          element={
            <AdminRoute>
              <AdminOrderDetail />
            </AdminRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/feedback"
          element={
            <AdminRoute>
              <AdminFeedback />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
