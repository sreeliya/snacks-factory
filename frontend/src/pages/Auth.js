import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.email && !formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }

    if (!isLogin) {
      if (!formData.name || !formData.phone) {
        setError('Please fill in all fields');
        return false;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        console.log('Login response:', result);
        console.log('localStorage.user (raw):', localStorage.getItem('user'));
        if (result.success) {
          const user = result.user || JSON.parse(localStorage.getItem('user'));
          console.log('Resolved user after login:', user);
          if (user?.isAdmin) {
            navigate('/admin/orders');
          } else {
            navigate('/shop');
          }
        } else {
          setError(result.message);
        }
      } else {
        const result = await register(
          formData.name,
          formData.email,
          formData.phone,
          formData.password
        );
        console.log('Register response:', result);
        console.log('localStorage.user (raw):', localStorage.getItem('user'));
        if (result.success) {
          const user = result.user || JSON.parse(localStorage.getItem('user'));
          console.log('Resolved user after register:', user);
          if (user?.isAdmin) {
            navigate('/admin/orders');
          } else {
            navigate('/shop');
          }
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🏭 Snacks Factory</h1>
          <p>Premium Snacks Ordering System</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
              setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
              });
            }}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
              setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
              });
            }}
          >
            Register
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
            />
            {!isLogin && (
              <small className="password-hint">Minimum 6 characters</small>
            )}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="auth-toggle-btn"
            >
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
