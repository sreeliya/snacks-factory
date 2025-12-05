import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }
    fetchOrderHistory();
  }, [token, navigate]);

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/customer-orders/history/my-orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        console.log('✅ Orders fetched from backend:', response.data.data);
        setOrders(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load order history');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#fdcb6e';
      case 'Confirmed':
        return '#6c5ce7';
      case 'Shipped':
        return '#00b894';
      case 'Delivered':
        return '#00b894';
      case 'Cancelled':
        return '#d63031';
      default:
        return '#636e72';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="order-history-container">
        <div className="loading">
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <div className="order-history-header">
        <h1>📦 Your Order History</h1>
        <p>View all your past orders and their status</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>
            Start Shopping →
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <div className="order-info">
                  <h3>{order.orderNumber}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status}
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-items">
                  <h4>Items ({order.items.length})</h4>
                  <div className="items-list">
                    {order.items.map((item, idx) => {
                      // Build name from multiple possible sources
                      let itemName = '';
                      if (item.snackName) itemName = item.snackName;
                      else if (item.name) itemName = item.name;
                      else if (item.title) itemName = item.title;
                      else if (item.snack) itemName = item.snack;
                      else itemName = 'Snack';
                      
                      // Fallback: if somehow still empty, use packet size
                      if (!itemName.trim()) {
                        itemName = item.packetType || 'Item';
                      }
                      
                      console.log(`Item ${idx}:`, JSON.stringify(item));
                      
                      return (
                        <div key={idx} className="order-item">
                          <span className="item-name">{itemName}</span>
                          <span className="item-packet">{item.packetType || '-'}</span>
                          <span className="item-qty">Qty: {item.quantity || 0}</span>
                          <span className="item-price">₹{(item.subtotal || 0).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="order-details">
                  <div className="detail-row">
                    <span className="label">Delivery Address:</span>
                    <span className="value">
                      {order.deliveryAddress?.street}, {order.deliveryAddress?.city}, {order.deliveryAddress?.state} {order.deliveryAddress?.zipCode}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Payment Method:</span>
                    <span className="value">{order.paymentMethod}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Total Amount:</span>
                    <span className="value total">₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
