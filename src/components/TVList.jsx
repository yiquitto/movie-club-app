import React from 'react';
import TVCard from './TVCard';
import './TVList.css';

const TVList = ({ shows, loading, error, dispatch, onRetry }) => {
  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <h3>{error}</h3>
        <button onClick={onRetry} className="retry-button">Tekrar Dene</button>
      </div>
    );
  }

  if (shows.length === 0) {
    return (
      <div className="empty-message">
        <p>Arama kriterlerinize uygun sonuç bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="tv-list-grid">
      {shows.map(show => (
        <TVCard key={show.id} show={show} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default TVList;
