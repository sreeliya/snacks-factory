// ===================================
// MATERIALS COMPONENT
// ===================================
// Manage raw materials

import React, { useState, useEffect } from 'react';
import { MaterialAPI } from '../api/api';

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    price: '',
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await MaterialAPI.getAll();
      setMaterials(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching materials:', err);
      setError('Failed to load materials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await MaterialAPI.update(editingId, formData);
        setSuccess('Material updated successfully!');
      } else {
        await MaterialAPI.create(formData);
        setSuccess('Material added successfully!');
      }
      resetForm();
      fetchMaterials();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save material');
    }
  };

  const handleEdit = (material) => {
    setFormData(material);
    setEditingId(material._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;
    try {
      await MaterialAPI.delete(id);
      setSuccess('Material deleted successfully!');
      fetchMaterials();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete material');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', quantity: '', unit: 'kg', price: '' });
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
          <h2>📦 Raw Materials</h2>
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + Add Material
            </button>
          )}
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f6fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '15px' }}>{editingId ? 'Edit Material' : 'Add New Material'}</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Material Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Flour, Sugar, Oil"
                />
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
                <label>Unit *</label>
                <select name="unit" value={formData.unit} onChange={handleInputChange}>
                  <option value="kg">kg</option>
                  <option value="liters">liters</option>
                  <option value="pieces">pieces</option>
                  <option value="bags">bags</option>
                  <option value="bottles">bottles</option>
                  <option value="boxes">boxes</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price (Optional)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price per unit"
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
          {materials.length === 0 ? (
            <p className="text-center text-muted">No materials found. Add one to get started!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Material Name</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material._id}>
                    <td>{material.name}</td>
                    <td>{material.quantity}</td>
                    <td>{material.unit}</td>
                    <td>${material.price.toFixed(2)}</td>
                    <td>
                      <button className="btn btn-primary btn-small" onClick={() => handleEdit(material)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-small" onClick={() => handleDelete(material._id)}>
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

export default Materials;
