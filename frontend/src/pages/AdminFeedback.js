// ===================================
// ADMIN FEEDBACK PAGE
// ===================================
// Admins can view all user feedback with ratings and manage them

import React, { useState, useEffect } from 'react';
import '../styles/adminFeedback.css';

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchFeedback();
    fetchStats();
  }, []);

  const fetchFeedback = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/feedback', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setFeedbackList(data.feedback);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error fetching feedback: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/feedback/stats/overview', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleStatusChange = async (feedbackId, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:5000/api/feedback/${feedbackId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setFeedbackList(
          feedbackList.map((fb) =>
            fb._id === feedbackId ? { ...fb, status: newStatus } : fb
          )
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:5000/api/feedback/${feedbackId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setFeedbackList(feedbackList.filter((fb) => fb._id !== feedbackId));
        }
      } catch (err) {
        console.error('Error deleting feedback:', err);
      }
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return '#51cf66';
    if (rating >= 3) return '#ffd43b';
    return '#ff8787';
  };

  const filteredFeedback =
    filterStatus === 'all'
      ? feedbackList
      : feedbackList.filter((fb) => fb.status === filterStatus);

  if (loading) return <div className="admin-feedback-loading">Loading feedback...</div>;

  return (
    <div className="admin-feedback-container">
      <h1>📊 User Feedback Management</h1>

      {/* Statistics Section */}
      {stats && (
        <div className="feedback-stats">
          <div className="stat-card">
            <h3>Total Feedback</h3>
            <p className="stat-number">{stats.totalFeedback}</p>
          </div>
          <div className="stat-card">
            <h3>Average Rating</h3>
            <p className="stat-number" style={{ color: getRatingColor(stats.averageRating) }}>
              {stats.averageRating.toFixed(2)} / 5.0
            </p>
          </div>
          <div className="stat-card">
            <h3>Rating Distribution</h3>
            <div className="rating-distribution">
              {stats.ratingDistribution.map((dist) => (
                <div key={dist._id} className="dist-item">
                  <span>⭐ {dist._id}: {dist.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="filter-section">
        <label>Filter by Status:</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Feedback</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Feedback List */}
      <div className="feedback-list-admin">
        {filteredFeedback.length === 0 ? (
          <p className="no-feedback">No feedback found.</p>
        ) : (
          filteredFeedback.map((feedback) => (
            <div key={feedback._id} className="feedback-card-admin">
              <div className="card-header">
                <div>
                  <h3>{feedback.userName}</h3>
                  <p className="feedback-date">
                    {new Date(feedback.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="rating-display" style={{ color: getRatingColor(feedback.rating) }}>
                  {'⭐'.repeat(feedback.rating)} ({feedback.rating}/5)
                </div>
              </div>

              <p className="feedback-message">{feedback.message}</p>

              <div className="card-footer">
                <div className="status-selector">
                  <label>Status:</label>
                  <select
                    value={feedback.status}
                    onChange={(e) => handleStatusChange(feedback._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <button
                  onClick={() => handleDelete(feedback._id)}
                  className="btn btn-danger btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;
