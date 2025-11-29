import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLoginClick, onLogout }) => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">

        <div className="nav-brand">
          <Link to="/">🏠 HomeValue+</Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/ideas" className={location.pathname === '/ideas' ? 'active' : ''}>Ideas</Link>
          </li>
          <li>
            <Link to="/report" className={location.pathname === '/report' ? 'active' : ''}>Get Report</Link>
          </li>

          {user?.isAdmin && (
            <li>
              <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {!user ? (
            <button onClick={onLoginClick} className="btn btn-primary">
              🔑 Sign In
            </button>
          ) : (
            <div className="three-dot-menu">

              {/* ⭐ Profile Picture Button */}
              <Link to="/profile">
                <img
                  src={user?.profilePic || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="profile-pic"
                />
              </Link>

              {/* Three-dot (Kebab) Button */}
              <button
                className="kebab-btn"
                onClick={() => setShowMenu(!showMenu)}
              >
                ⋮
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="kebab-dropdown">
                  <Link to="/dashboard" className="kebab-item">📊 Dashboard</Link>
                  <Link to="/report" className="kebab-item">🏠 New Report</Link>
                  <button onClick={onLogout} className="kebab-item logout">🚪 Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Header;
