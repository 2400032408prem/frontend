import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';
import { roomTypes, costRanges, effortLevels } from '../../data/improvementData';

const IdeasPage = () => {
  const [improvements, setImprovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    room: 'All',
    cost: 'All',
    effort: 'All',
    searchQuery: ''
  });

  useEffect(() => {
    loadImprovements();
  }, [filters]);

  const loadImprovements = async () => {
    try {
      setLoading(true);
      const apiFilters = {};
      if (filters.room !== 'All') apiFilters.room = filters.room;
      if (filters.cost !== 'All') apiFilters.cost = filters.cost;
      if (filters.effort !== 'All') apiFilters.effort = filters.effort;
      
      let data = await apiService.getImprovements(apiFilters);
      
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        data = data.filter(imp => 
          imp.title.toLowerCase().includes(query) ||
          imp.description.toLowerCase().includes(query)
        );
      }
      
      setImprovements(data);
    } catch (error) {
      console.error('Error loading improvements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const styles = {
    page: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '2.5rem', color: '#1a365d', marginBottom: '1rem' },
    subtitle: { fontSize: '1.2rem', color: '#666' },
    filters: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '1rem', 
      padding: '1.5rem', 
      background: '#f8f9fa', 
      borderRadius: '8px', 
      marginBottom: '2rem' 
    },
    filterGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    filterLabel: { fontWeight: '600', color: '#333', fontSize: '0.9rem' },
    filterInput: { 
      padding: '0.5rem', 
      border: '2px solid #e1e5e9', 
      borderRadius: '6px', 
      fontSize: '0.9rem' 
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
      gap: '2rem' 
    },
    card: { 
      background: 'white', 
      borderRadius: '12px', 
      padding: '1.5rem', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '2px solid transparent',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    cardHeader: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      marginBottom: '1rem' 
    },
    cardTitle: { fontSize: '1.25rem', fontWeight: '600', color: '#333', margin: 0, flex: 1, marginRight: '1rem' },
    costBadge: (cost) => ({ 
      color: 'white', 
      padding: '0.25rem 0.75rem', 
      borderRadius: '20px', 
      fontSize: '0.875rem', 
      fontWeight: '500',
      background: cost === 'Low' ? '#4CAF50' : cost === 'Medium' ? '#FF9800' : '#F44336'
    }),
    cardDescription: { color: '#666', marginBottom: '1rem', lineHeight: 1.6 },
    metrics: { 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: '0.75rem', 
      margin: '1rem 0' 
    },
    metric: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0.5rem', 
      background: '#f8f9fa', 
      borderRadius: '6px' 
    },
    metricLabel: { fontSize: '0.875rem', color: '#666' },
    metricValue: { fontWeight: '600', color: '#333' },
    cardFooter: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      paddingTop: '1rem', 
      borderTop: '1px solid #eee' 
    },
    roomTag: { 
      background: '#e3f2fd', 
      color: '#1976d2', 
      padding: '0.25rem 0.75rem', 
      borderRadius: '15px', 
      fontSize: '0.875rem' 
    },
    duration: { color: '#666', fontSize: '0.875rem' },
    noResults: { textAlign: 'center', padding: '4rem 2rem', color: '#666' }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Home Improvement Ideas</h1>
        <p style={styles.subtitle}>Browse through curated improvement ideas with ROI analysis</p>
      </header>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Search:</label>
          <input
            type="text"
            placeholder="Search improvements..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            style={styles.filterInput}
          />
        </div>
        
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Room:</label>
          <select 
            value={filters.room} 
            onChange={(e) => handleFilterChange('room', e.target.value)}
            style={styles.filterInput}
          >
            {roomTypes.map(room => (
              <option key={room} value={room}>{room}</option>
            ))}
          </select>
        </div>
        
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Cost:</label>
          <select 
            value={filters.cost} 
            onChange={(e) => handleFilterChange('cost', e.target.value)}
            style={styles.filterInput}
          >
            {costRanges.map(cost => (
              <option key={cost} value={cost}>{cost}</option>
            ))}
          </select>
        </div>
        
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Effort:</label>
          <select 
            value={filters.effort} 
            onChange={(e) => handleFilterChange('effort', e.target.value)}
            style={styles.filterInput}
          >
            {effortLevels.map(effort => (
              <option key={effort} value={effort}>{effort}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{margin: '2rem 0', color: '#666'}}>
        {loading ? 'Loading...' : `Found ${improvements.length} improvement ideas`}
      </div>

      <div style={styles.grid}>
        {improvements.map(improvement => (
          <div key={improvement.id} style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = '#2196F3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>{improvement.title}</h3>
              <span style={styles.costBadge(improvement.cost)}>
                {improvement.cost} Cost
              </span>
            </div>
            
            <p style={styles.cardDescription}>{improvement.description}</p>
            
            <div style={styles.metrics}>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>ROI Potential:</span>
                <span style={styles.metricValue}>{improvement.roi}</span>
              </div>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Value Impact:</span>
                <span style={styles.metricValue}>+{improvement.impact}%</span>
              </div>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Effort:</span>
                <span style={styles.metricValue}>{improvement.effort}</span>
              </div>
              <div style={styles.metric}>
                <span style={styles.metricLabel}>Budget:</span>
                <span style={styles.metricValue}>{improvement.budgetRange}</span>
              </div>
            </div>
            
            <div style={styles.cardFooter}>
              <span style={styles.roomTag}>{improvement.room}</span>
              <span style={styles.duration}>{improvement.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {improvements.length === 0 && (
        <div style={styles.noResults}>
          <h3>No improvements found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      )}
    </div>
  );
};

export default IdeasPage;