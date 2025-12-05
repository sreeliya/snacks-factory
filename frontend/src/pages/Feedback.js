// ===================================
// FEEDBACK PAGE - USER
// ===================================
// Users can submit feedback with rating and message

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/feedback.css';

const Feedback = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userFeedback, setUserFeedback] = useState([]);
  const [error, setError] = useState('');

  // Fetch user's feedback on mount
  useEffect(() => {
    fetchUserFeedback();
  }, []);

  const fetchUserFeedback = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/feedback/user/my-feedback', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserFeedback(data.feedback);
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: parseInt(rating),
          message,
          userName: user?.name || 'Anonymous',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setMessage('');
        setRating(5);
        setTimeout(() => setSubmitted(false), 3000);
        // Refresh feedback list
        fetchUserFeedback();
      } else {
        setError(data.message || 'Failed to submit feedback');
      }
    } catch (err) {
      setError('Error submitting feedback: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return '#51cf66'; // green
    if (rating >= 3) return '#ffd43b'; // yellow
    return '#ff8787'; // red
  };

  const getRatingEmoji = (rating) => {
    if (rating === 5) return '😍';
    if (rating === 4) return '😊';
    if (rating === 3) return '😐';
    if (rating === 2) return '😞';
    return '😤';
  };

  return (
    <div className="feedback-container">
      <div className="feedback-wrapper">
        <h1>Share Your Feedback</h1>
        <p className="subtitle">Help us improve! Rate your experience and leave a message.</p>

        {/* Feedback Form */}
        <div className="feedback-form-section">
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="rating">Rating: </label>
              <div className="rating-selector">
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="rating-input"
                >
                  <option value="5">5 - Excellent ⭐⭐⭐⭐⭐</option>
                  <option value="4">4 - Good ⭐⭐⭐⭐</option>
                  <option value="3">3 - Average ⭐⭐⭐</option>
                  <option value="2">2 - Poor ⭐⭐</option>
                  <option value="1">1 - Terrible ⭐</option>
                </select>
                <span className="rating-emoji" style={{ fontSize: '2em', marginLeft: '1rem' }}>
                  {getRatingEmoji(parseInt(rating))}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Feedback:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your experience... (minimum 10 characters)"
                rows="6"
                className="feedback-textarea"
                required
              />
              <small>{message.length} / 500 characters</small>
            </div>

            {error && <div className="error-message">{error}</div>}
            {submitted && (
              <div className="success-message">✓ Thank you! Your feedback has been submitted.</div>
            )}

            <button
              type="submit"
              disabled={loading || message.length < 10}
              className="btn btn-primary btn-submit"
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>

        {/* User's Feedback History */}
        <div className="feedback-history-section">
          <h2>Your Feedback History</h2>
          {userFeedback.length === 0 ? (
            <p className="no-feedback">No feedback submitted yet. Share your first feedback above!</p>
          ) : (
            <div className="feedback-list">
              {userFeedback.map((fb) => (
                <div key={fb._id} className="feedback-card">
                  <div className="feedback-header">
                    <div className="feedback-rating" style={{ color: getRatingColor(fb.rating) }}>
                      {'⭐'.repeat(fb.rating)}
                    </div>
                    <div className="feedback-date">
                      {new Date(fb.createdAt).toLocaleDateString()} at{' '}
                      {new Date(fb.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <p className="feedback-message">{fb.message}</p>
                  <div className="feedback-status">
                    Status: <span className={`status-badge ${fb.status}`}>{fb.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
