import React from 'react';
import './ImprovementCard.css';

const ImprovementCard = ({ improvement, onSelect }) => {
  const getCostColor = (cost) => {
    const colors = { Low: '#4CAF50', Medium: '#FF9800', High: '#F44336' };
    return colors[cost] || '#666';
  };

  return (
    <article className="improvement-card" onClick={() => onSelect(improvement)}>
      <header className="card-header">
        <h3 className="card-title">{improvement.title}</h3>
        <span 
          className="cost-badge"
          style={{ backgroundColor: getCostColor(improvement.cost) }}
        >
          {improvement.cost} Cost
        </span>
      </header>
      
      <p className="card-description">{improvement.description}</p>
      
      <div className="card-metrics">
        <div className="metric">
          <span className="metric-label">ROI Potential:</span>
          <span className="metric-value">{improvement.roi}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Value Impact:</span>
          <span className="metric-value">+{improvement.impact}%</span>
        </div>
        <div className="metric">
          <span className="metric-label">Effort:</span>
          <span className="metric-value">{improvement.effort}</span>
        </div>
      </div>
      
      <footer className="card-footer">
        <span className="room-tag">{improvement.room}</span>
        <span className="duration">{improvement.duration}</span>
      </footer>
    </article>
  );
};

export default ImprovementCard;