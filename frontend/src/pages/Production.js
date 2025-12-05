// ===================================
// PRODUCTION COMPONENT
// ===================================
// Record production and track material usage

import React, { useState, useEffect } from 'react';
import { ProductionAPI, MaterialAPI } from '../api/api';

const Production = () => {
  const [productions, setProductions] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    snackName: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Completed',
    materialUsed: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, matRes] = await Promise.all([
        ProductionAPI.getAll(),
        MaterialAPI.getAll(),
      ]);
      setProductions(prodRes.data.data);
      setMaterials(matRes.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load production data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await ProductionAPI.update(editingId, formData);
        setSuccess('Production updated successfully!');
      } else {
        await ProductionAPI.create(formData);
        setSuccess('Production recorded successfully!');
      }
      resetForm();
      fetchData();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save production');
    }
  };

  const handleEdit = (prod) => {
    setFormData(prod);
    setEditingId(prod._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await ProductionAPI.delete(id);
      setSuccess('Production deleted!');
      fetchData();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete production');
    }
  };

  const resetForm = () => {
    setFormData({
      snackName: '',
      quantity: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
      materialUsed: [],
    });
    setEditingId(null);
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

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>⚙️ Production Records</h2>
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + New Production
            </button>
          )}
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f6fa', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '15px' }}>{editingId ? 'Edit Production' : 'Record New Production'}</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Snack Name *</label>
                <input
                  type="text"
                  name="snackName"
                  value={formData.snackName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Potato Chips, Popcorn"
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
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-secondary">
                {editingId ? '✓ Update' : '✓ Record'}
              </button>
              <button type="button" className="btn btn-warning" onClick={resetForm}>
                ✕ Cancel
              </button>
            </div>
          </form>
        )}

        <div className="table-container">
          {productions.length === 0 ? (
            <p className="text-center text-muted">No production records found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Snack Name</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productions.map((prod) => (
                  <tr key={prod._id}>
                    <td>{prod.snackName}</td>
                    <td>{prod.quantity}</td>
                    <td>{new Date(prod.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge badge-${prod.status === 'Completed' ? 'success' : 'warning'}`}>
                        {prod.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-primary btn-small" onClick={() => handleEdit(prod)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-small" onClick={() => handleDelete(prod._id)}>
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

export default Production;
