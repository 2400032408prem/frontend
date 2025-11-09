import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const stats = [
    { number: '15-25%', label: 'Average Value Increase' },
    { number: '50,000+', label: 'Happy Homeowners' },
    { number: '₹5-20L', label: 'Value Added per Property' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🏆 Trusted by Indian Homeowners</div>
          <h1>Smart Home Improvements for Maximum Value</h1>
          <p className="hero-subtitle">
            Get data-driven recommendations tailored for Indian middle-class homes. 
            Increase your property value with cost-effective, high-ROI improvements.
          </p>
          <div className="hero-buttons">
            <Link to="/ideas" className="btn btn-primary">
              💡 Explore Improvement Ideas
            </Link>
            <Link to="/report" className="btn btn-secondary">
              📊 Get Free Valuation Report
            </Link>
          </div>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card">
            <div className="card-header">Before: ₹45L</div>
            <div className="card-arrow">→</div>
            <div className="card-header accent">After: ₹58L</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Designed for Indian Middle-Class Homes</h2>
            <p>Practical solutions that respect your budget and deliver real results</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Budget-Friendly</h3>
              <p>Recommendations starting from ₹10,000 with proven ROI for Indian market conditions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏘️</div>
              <h3>Localized Solutions</h3>
              <p>Tailored for Indian apartments, independent houses, and local construction practices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Data-Driven Insights</h3>
              <p>Based on actual Indian real estate data and buyer preferences</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Implementation</h3>
              <p>Most improvements can be completed within 2-4 weeks with local contractors</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Increase Your Home's Value?</h2>
            <p>Join thousands of Indian homeowners who've added significant value to their properties</p>
            <Link to="/report" className="btn btn-primary large">
              🚀 Start Your Home Improvement Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;