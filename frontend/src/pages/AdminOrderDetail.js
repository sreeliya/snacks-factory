import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState(order?.status || 'Pending');

  const statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  const updateStatus = async () => {
    if (newStatus === order.status) {
      alert('Status not changed');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/customer-orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrder({ ...order, status: newStatus });
        alert(`✓ Order status updated to ${newStatus}`);
      }
    } catch (err) {
      alert('Failed to update: ' + err.message);
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
        return '#0984e3';
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

  if (!order) {
    return (
      <div className="admin-order-detail-container">
        <div className="loading">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-order-detail-container">
      <button className="btn btn-back" onClick={() => navigate('/admin/orders')}>
        ← Back to Orders
      </button>

      <div className="order-detail-header">
        <div>
          <h1>{order.orderNumber}</h1>
          <p className="order-date">{formatDate(order.createdAt)}</p>
        </div>
        <span
          className="status-badge-large"
          style={{ backgroundColor: getStatusColor(order.status) }}
        >
          {order.status}
        </span>
      </div>

      <div className="detail-grid">
        {/* Customer Section */}
        <div className="detail-section">
          <h3>👤 Customer Details</h3>
          <div className="detail-field">
            <label>Name:</label>
            <span>{order.customer.name}</span>
          </div>
          <div className="detail-field">
            <label>Email:</label>
            <span>{order.customer.email}</span>
          </div>
          <div className="detail-field">
            <label>Phone:</label>
            <span>{order.customer.phone}</span>
          </div>
        </div>

        {/* Delivery Section */}
        <div className="detail-section">
          <h3>🚚 Delivery Address</h3>
          <div className="detail-field">
            <label>Street:</label>
            <span>{order.deliveryAddress?.street}</span>
          </div>
          <div className="detail-field">
            <label>City:</label>
            <span>{order.deliveryAddress?.city}</span>
          </div>
          <div className="detail-field">
            <label>State:</label>
            <span>{order.deliveryAddress?.state}</span>
          </div>
          <div className="detail-field">
            <label>ZIP Code:</label>
            <span>{order.deliveryAddress?.zipCode}</span>
          </div>
          <div className="detail-field">
            <label>Country:</label>
            <span>{order.deliveryAddress?.country}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="detail-section">
          <h3>💳 Payment Details</h3>
          <div className="detail-field">
            <label>Method:</label>
            <span>{order.paymentMethod}</span>
          </div>
          <div className="detail-field">
            <label>Total Amount:</label>
            <span className="amount">₹{order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Status Update Section */}
        <div className="detail-section">
          <h3>📊 Update Status</h3>
          <div className="status-update">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="status-select"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary"
              onClick={updateStatus}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="detail-section full-width">
        <h3>📦 Order Items ({order.items.length})</h3>
        <div className="items-table">
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Packet Size</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="item-name">
                    {item.snackName || item.name || 'Snack Item'}
                  </td>
                  <td>{item.packetType || '-'}</td>
                  <td className="qty">{item.quantity}</td>
                  <td>₹{item.price?.toFixed(2) || '0.00'}</td>
                  <td className="subtotal">₹{item.subtotal?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan="4"><strong>Total:</strong></td>
                <td className="total-amount">
                  <strong>₹{order.totalAmount.toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Notes Section */}
      {order.notes && (
        <div className="detail-section full-width">
          <h3>📝 Order Notes</h3>
          <p className="notes-text">{order.notes}</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetail;
