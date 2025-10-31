import React from 'react';
import './Filters.css';

const Filters = ({ dispatch, filters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FILTERS', payload: { [name]: value } });
  };

  const handleReset = () => {
    // Sadece arama sorgusunu sıfırla
    dispatch({ type: 'SET_QUERY', payload: '' });
  };

  return (
    <div className="filters-container">
      <div className="filters-body">
        <div className="filter-group">
          <select name="genre" value={filters.genre} onChange={handleFilterChange}>
            <option value="">Tür (hepsi)</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Action">Action</option>
            <option value="Thriller">Thriller</option>
            <option value="Science-Fiction">Science-Fiction</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
        <div className="filter-group">
          <select name="language" value={filters.language} onChange={handleFilterChange}>
            <option value="">Dil (hepsi)</option>
            <option value="English">English</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
            <option value="Turkish">Turkish</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div className="filter-group">
          <select name="rating" value={filters.rating} onChange={handleFilterChange}>
            <option value="0">Min Puan (0+)</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
          </select>
        </div>
      </div>
      <div className="filters-footer">
        <button onClick={handleReset} className="reset-button">
          Sıfırla
        </button>
      </div>
    </div>
  );
};

export default Filters;