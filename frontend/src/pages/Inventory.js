// ===================================
// INVENTORY COMPONENT
// ===================================
// Manage finished goods inventory

import React, { useState, useEffect } from 'react';
import { InventoryAPI } from '../api/api';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    unit: 'pieces',
    price: '',
    sku: '',
    category: 'General',
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await InventoryAPI.getAll();
      setInventory(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching inventory:', err);
      setError('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await InventoryAPI.update(editingId, formData);
        setSuccess('Item updated successfully!');
      } else {
        await InventoryAPI.create(formData);
        setSuccess('Item added successfully!');
      }
      resetForm();
      fetchInventory();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save item');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await InventoryAPI.delete(id);
      setSuccess('Item deleted!');
      fetchInventory();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const resetForm = () => {
    setFormData({
      itemName: '',
      quantity: '',
      unit: 'pieces',
      price: '',
      sku: '',
      category: 'General',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'price' ? parseFloat(value) || '' : value,
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

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>📦 Finished Goods Inventory</h2>
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + Add Item
            </button>
          )}
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f6fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '15px' }}>{editingId ? 'Edit Item' : 'Add New Item'}</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Item Name *</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Salted Chips"
                />
              </div>
              <div className="form-group">
                <label>SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="e.g., SKU-001"
                />
              </div>
            </div>
            <div className="form-row">
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
              <div className="form-group">
                <label>Unit</label>
                <select name="unit" value={formData.unit} onChange={handleInputChange}>
                  <option value="pieces">pieces</option>
                  <option value="boxes">boxes</option>
                  <option value="bags">bags</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price (Optional)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Snacks"
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-secondary">
                {editingId ? '✓ Update' : '✓ Add'}
              </button>
              <button type="button" className="btn btn-warning" onClick={resetForm}>
                ✕ Cancel
              </button>
            </div>
          </form>
        )}

        <div className="table-container">
          {inventory.length === 0 ? (
            <p className="text-center text-muted">No inventory items found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.sku || '-'}</td>
                    <td>{item.quantity}</td>
                    <td>{item.category}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <button className="btn btn-primary btn-small" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-small" onClick={() => handleDelete(item._id)}>
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

export default Inventory;
