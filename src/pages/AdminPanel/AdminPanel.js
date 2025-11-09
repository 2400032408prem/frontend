import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [improvements, setImprovements] = useState([]);
  const [newImprovement, setNewImprovement] = useState({
    title: '',
    description: '',
    cost: 'Low',
    effort: 'Medium',
    roi: 'High',
    impact: 0,
    room: 'All'
  });

  const handleAddImprovement = (e) => {
    e.preventDefault();
    setImprovements([...improvements, { ...newImprovement, id: Date.now() }]);
    setNewImprovement({
      title: '',
      description: '',
      cost: 'Low',
      effort: 'Medium',
      roi: 'High',
      impact: 0,
      room: 'All'
    });
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage property improvement recommendations</p>
      </div>

      <div className="admin-content">
        <div className="admin-section classic-card">
          <h2>Add New Improvement</h2>
          <form onSubmit={handleAddImprovement} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newImprovement.title}
                  onChange={(e) => setNewImprovement({...newImprovement, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Room Type</label>
                <select
                  value={newImprovement.room}
                  onChange={(e) => setNewImprovement({...newImprovement, room: e.target.value})}
                >
                  <option value="All">All</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bathroom">Bathroom</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Exterior">Exterior</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newImprovement.description}
                onChange={(e) => setNewImprovement({...newImprovement, description: e.target.value})}
                required
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cost</label>
                <select
                  value={newImprovement.cost}
                  onChange={(e) => setNewImprovement({...newImprovement, cost: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Effort</label>
                <select
                  value={newImprovement.effort}
                  onChange={(e) => setNewImprovement({...newImprovement, effort: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>ROI Potential</label>
                <select
                  value={newImprovement.roi}
                  onChange={(e) => setNewImprovement({...newImprovement, roi: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Value Impact (%)</label>
                <input
                  type="number"
                  value={newImprovement.impact}
                  onChange={(e) => setNewImprovement({...newImprovement, impact: parseInt(e.target.value)})}
                  min="0"
                  max="50"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Add Improvement</button>
          </form>
        </div>

        <div className="admin-section classic-card">
          <h2>Current Improvements ({improvements.length})</h2>
          <div className="improvements-list">
            {improvements.map(imp => (
              <div key={imp.id} className="improvement-item">
                <h3>{imp.title}</h3>
                <p>{imp.description}</p>
                <div className="improvement-meta">
                  <span className="meta-tag room">{imp.room}</span>
                  <span className="meta-tag cost">{imp.cost} Cost</span>
                  <span className="meta-tag roi">{imp.roi} ROI</span>
                  <span className="meta-tag impact">+{imp.impact}% Value</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;