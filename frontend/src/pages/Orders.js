// ===================================
// ORDERS COMPONENT
// ===================================
// Create and track customer orders

import React, { useState, useEffect } from 'react';
import { OrderAPI, InventoryAPI } from '../api/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    itemId: '',
    quantity: '',
    customerName: '',
    notes: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordRes, invRes] = await Promise.all([
        OrderAPI.getAll(),
        InventoryAPI.getAll(),
      ]);
      setOrders(ordRes.data.data);
      setInventoryItems(invRes.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await OrderAPI.create(formData);
      setSuccess('Order created successfully!');
      resetForm();
      fetchData();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await OrderAPI.updateStatus(orderId, { status: newStatus });
      setSuccess('Order status updated!');
      fetchData();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await OrderAPI.delete(id);
      setSuccess('Order deleted!');
      fetchData();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete order');
    }
  };

  const resetForm = () => {
    setFormData({
      itemId: '',
      quantity: '',
      customerName: '',
      notes: '',
    });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseFloat(value) || '' : value,
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Processing':
        return 'info';
      case 'Shipped':
        return 'success';
      case 'Delivered':
        return 'success';
      default:
        return 'warning';
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>🚚 Orders & Dispatch</h2>
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + New Order
            </button>
          )}
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f6fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '15px' }}>Create New Order</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Item *</label>
                <select
                  name="itemId"
                  value={formData.itemId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select an item</option>
                  {inventoryItems.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.itemName} (Available: {item.quantity})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter quantity"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Customer Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter customer name"
                />
              </div>
              <div className="form-group">
                <label>Notes (Optional)</label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add notes"
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-secondary">
                ✓ Create Order
              </button>
              <button type="button" className="btn btn-warning" onClick={resetForm}>
                ✕ Cancel
              </button>
            </div>
          </form>
        )}

        <div className="table-container">
          {orders.length === 0 ? (
            <p className="text-center text-muted">No orders found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Item</th>
                  <th>Customer</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td><strong>{order.orderId}</strong></td>
                    <td>{order.itemName}</td>
                    <td>{order.customerName}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        style={{ padding: '4px', borderRadius: '4px' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-danger btn-small" onClick={() => handleDelete(order._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
