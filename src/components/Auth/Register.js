import React, { useState } from 'react';
import apiService from '../../services/api';
import './Auth.css';

const Register = ({ onRegister, onSwitchToLogin, onClose }) => {
  const [formData, setFormData] = useState({ 
    name: '',
    email: '', 
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const userData = await apiService.register(formData.name, formData.email, formData.password);
      onRegister(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-container premium-card">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="auth-header">
          <div className="auth-icon">🎉</div>
          <h2>Join HomeValue+</h2>
          <p>Create your account to start your home improvement journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>User Type</label>
            <div className="user-type-selector">
              <button
                type="button"
                className={`type-btn ${formData.userType === 'user' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, userType: 'user'})}
              >
                👤 Homeowner
              </button>
              <button
                type="button"
                className={`type-btn ${formData.userType === 'admin' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, userType: 'admin'})}
              >
                ⚙️ Admin
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your full name"
              required
              className="premium-input"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
              className="premium-input"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Enter your phone number"
              className="premium-input"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Create a password"
              required
              className="premium-input"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirm your password"
              required
              className="premium-input"
            />
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary full-width ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Creating Account...
              </>
            ) : (
              '🚀 Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? 
            <button onClick={onSwitchToLogin} className="link-btn">
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;