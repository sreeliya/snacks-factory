import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }
    fetchAllOrders();
  }, [token, navigate]);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/customer-orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setOrders(response.data.data);
        console.log('✅ All orders fetched:', response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
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
        // Update local state
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        alert(`✓ Order status updated to ${newStatus}`);
      }
    } catch (err) {
      alert('Failed to update order status: ' + err.message);
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

  const filteredOrders = orders
    .filter((order) => filter === 'All' || order.status === filter)
    .filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.phone.includes(searchTerm)
    );

  if (loading) {
    return (
      <div className="admin-orders-container">
        <div className="loading">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders-container">
      <div className="admin-header">
        <h1>📋 Admin - Customer Orders</h1>
        <p>Total Orders: <strong>{orders.length}</strong></p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="admin-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by order #, customer name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          {['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(
            (status) => (
              <button
                key={status}
                className={`filter-btn ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      <div className="orders-stats">
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <span className="stat-value">{orders.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending</span>
          <span className="stat-value" style={{ color: '#fdcb6e' }}>
            {orders.filter((o) => o.status === 'Pending').length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Confirmed</span>
          <span className="stat-value" style={{ color: '#6c5ce7' }}>
            {orders.filter((o) => o.status === 'Confirmed').length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Shipped</span>
          <span className="stat-value" style={{ color: '#0984e3' }}>
            {orders.filter((o) => o.status === 'Shipped').length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Delivered</span>
          <span className="stat-value" style={{ color: '#00b894' }}>
            {orders.filter((o) => o.status === 'Delivered').length}
          </span>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="admin-orders-list">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="order-row">
                  <td className="order-number">
                    <strong>{order.orderNumber}</strong>
                  </td>
                  <td>{order.customer.name}</td>
                  <td className="address-cell">
                    {order.deliveryAddress
                      ? `${order.deliveryAddress.street || ''}${order.deliveryAddress.street ? ', ' : ''}${order.deliveryAddress.city || ''}${order.deliveryAddress.city ? ', ' : ''}${order.deliveryAddress.state || ''}${order.deliveryAddress.zipCode ? ' - ' + order.deliveryAddress.zipCode : ''}`
                      : '—'}
                  </td>
                  <td>{order.customer.email}</td>
                  <td>{order.customer.phone}</td>
                  <td className="items-count" title={order.items.map(i => i.snackName || i.name || 'Item').join(', ')}>
                    {/* Show first two item names then count */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600 }}>
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </span>
                      <span style={{ color: '#555', fontSize: '0.9rem' }}>
                        {order.items
                          .map((i) => i.snackName || i.name || 'Item')
                          .slice(0, 2)
                          .join(', ')}
                        {order.items.length > 2 ? ', ...' : ''}
                      </span>
                    </div>
                  </td>
                  <td className="total">₹{order.totalAmount.toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="date">{formatDate(order.createdAt)}</td>
                  <td className="actions">
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="status-inline-select"
                        title="Change status"
                      >
                        {['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(
                          (s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          )
                        )}
                      </select>

                      <button
                        className="btn-sm btn-view"
                        onClick={() => {
                          navigate(`/admin/order/${order._id}`, { state: { order } });
                        }}
                        title="View Details"
                      >
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
