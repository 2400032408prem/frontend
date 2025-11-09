import React from 'react';
import './SearchFilters.css';

const SearchFilters = ({ filters, onFilterChange, roomTypes, costRanges, effortLevels }) => {
  const handleFilterUpdate = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="search-filters">
      <div className="filter-group">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Search improvements..."
          value={filters.searchQuery}
          onChange={(e) => handleFilterUpdate('searchQuery', e.target.value)}
        />
      </div>
      
      <div className="filter-group">
        <label>Room:</label>
        <select 
          value={filters.room} 
          onChange={(e) => handleFilterUpdate('room', e.target.value)}
        >
          {roomTypes.map(room => (
            <option key={room} value={room}>{room}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Cost:</label>
        <select 
          value={filters.cost} 
          onChange={(e) => handleFilterUpdate('cost', e.target.value)}
        >
          {costRanges.map(cost => (
            <option key={cost} value={cost}>{cost}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label>Effort:</label>
        <select 
          value={filters.effort} 
          onChange={(e) => handleFilterUpdate('effort', e.target.value)}
        >
          {effortLevels.map(effort => (
            <option key={effort} value={effort}>{effort}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;