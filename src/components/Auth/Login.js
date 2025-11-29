import React, { useState } from 'react';
import apiService from '../../services/api';
import './Auth.css';

const Login = ({ onLogin, onSwitchToRegister, onClose }) => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '',
    userType: 'user' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userData = await apiService.login(credentials.email, credentials.password);
      onLogin(userData);
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
          <div className="auth-icon">🔐</div>
          <h2>Welcome to HomeValue+</h2>
          <p>Sign in to access personalized home improvement insights</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>User Type</label>
            <div className="user-type-selector">
              <button
                type="button"
                className={`type-btn ${credentials.userType === 'user' ? 'active' : ''}`}
                onClick={() => setCredentials({...credentials, userType: 'user'})}
              >
                👤 Homeowner
              </button>
              <button
                type="button"
                className={`type-btn ${credentials.userType === 'admin' ? 'active' : ''}`}
                onClick={() => setCredentials({...credentials, userType: 'admin'})}
              >
                ⚙️ Admin
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              placeholder="Enter your email"
              required
              className="premium-input"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Enter your password"
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
                Signing In...
              </>
            ) : (
              '🔑 Sign In'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? 
            <button onClick={onSwitchToRegister} className="link-btn">
              Create one here
            </button>
          </p>
        </div>

        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <div className="demo-cards">
            <div className="demo-card">
              <strong>Homeowner:</strong> any email/password
            </div>
            <div className="demo-card">
              <strong>Admin:</strong> admin@homevalue.com / any password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;