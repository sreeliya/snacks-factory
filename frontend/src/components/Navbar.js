// ===================================
// NAVBAR COMPONENT
// ===================================
// Navigation bar for the application

import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          🏭 Snacks Factory
        </Link>
        <ul className="navbar-menu">
          {/* If user is admin, only show Admin and Feedback links */}
          {isAuthenticated && user?.isAdmin ? (
            <>
              <li>
                <Link to="/admin/orders" className="navbar-link" style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                  ⚙️ Admin
                </Link>
              </li>
              <li>
                <Link to="/admin/feedback" className="navbar-link" style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                  💬 Feedback
                </Link>
              </li>
            </>
          ) : (
            <>
              {isAuthenticated && (
                <>
                  <li>
                    <Link to="/shop" className="navbar-link">🛒 Shop</Link>
                  </li>
                  <li>
                    <Link to="/cart" className="navbar-link">
                      Cart {getCartItemsCount() > 0 && `(${getCartItemsCount()})`}
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="navbar-link">📦 Orders</Link>
                  </li>
                  <li>
                    <Link to="/feedback" className="navbar-link">💬 Feedback</Link>
                  </li>
                </>
              )}
            </>
          )}
          {/* no duplicate Welcome link; Welcome is rendered above for non-admin users */}
        </ul>

        <div className="navbar-user">
          {isAuthenticated ? (
            <>
              <span className="user-name">{user?.name}</span>
              <button className="btn btn-secondary btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary btn-login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
