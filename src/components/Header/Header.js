import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLoginClick, onLogout }) => {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">🏠 HomeValue+</Link>
        </div>
        
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/ideas" className={location.pathname === '/ideas' ? 'active' : ''}>
              Ideas
            </Link>
          </li>
          <li>
            <Link to="/report" className={location.pathname === '/report' ? 'active' : ''}>
              Get Report
            </Link>
          </li>
          {user?.isAdmin && (
            <li>
              <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <button 
                className="user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user.isAdmin ? '⚙️' : '👤'} {user.name}
              </button>
              {showUserMenu && (
                <div className="user-dropdown premium-card">
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <span className="user-role">{user.isAdmin ? 'Administrator' : 'Homeowner'}</span>
                  </div>
                  <Link to="/dashboard" className="dropdown-item">
                    📊 Dashboard
                  </Link>
                  <Link to="/report" className="dropdown-item">
                    🏠 New Report
                  </Link>
                  <button onClick={onLogout} className="dropdown-item logout">
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={onLoginClick} className="btn btn-primary">
              🔑 Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;