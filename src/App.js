import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HomePage from './pages/HomePage/HomePage';
import IdeasPage from './pages/IdeasPage/IdeasPage';
import ReportPage from './pages/ReportPage/ReportPage';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const openLogin = () => {
    setAuthMode('login');
    setShowAuth(true);
  };

  const openRegister = () => {
    setAuthMode('register');
    setShowAuth(true);
  };

  const switchToRegister = () => {
    setAuthMode('register');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  const closeAuth = () => {
    setShowAuth(false);
  };

  return (
    <Router>
      <div className="App">
        <Header 
          user={user} 
          onLoginClick={openLogin} 
          onLogout={handleLogout} 
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route 
              path="/report" 
              element={<ReportPage user={user} />} 
            />
            <Route 
              path="/admin" 
              element={
                user?.isAdmin ? <AdminPanel /> : <HomePage />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? <Dashboard user={user} /> : <HomePage />
              } 
            />
          </Routes>
        </main>

        {showAuth && (
          authMode === 'login' ? (
            <Login 
              onLogin={handleLogin}
              onSwitchToRegister={switchToRegister}
              onClose={closeAuth}
            />
          ) : (
            <Register 
              onRegister={handleRegister}
              onSwitchToLogin={switchToLogin}
              onClose={closeAuth}
            />
          )
        )}
      </div>
    </Router>
  );
}

export default App;