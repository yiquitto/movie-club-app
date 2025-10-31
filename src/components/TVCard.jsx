import React from 'react';
import { Link } from 'react-router-dom';
import './TVCard.css';

const TVCard = ({ show, dispatch }) => {
  const handleAddToWatchlist = () => {
    dispatch({ type: 'ADD_WATCHLIST', payload: show });
  };

  // HTML etiketlerini temizlemek için basit bir fonksiyon
  const stripHtml = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  const summary = show.summary ? stripHtml(show.summary).slice(0, 100) + '...' : 'Özet mevcut değil.';
  const poster = show.image?.medium || 'https://via.placeholder.com/210x295.png?text=No+Image';

  return (
    <div className="tv-card">
      <img src={poster} alt={show.name} className="card-poster" />
      <div className="card-body">
        <h3 className="card-title">{show.name}</h3>
        <div className="card-tags">
          {show.rating?.average && (
            <span className="tag rating-tag">⭐ {show.rating.average}</span>
          )}
          {show.language && (
            <span className="tag lang-tag">{show.language}</span>
          )}
          {show.genres?.slice(0, 2).map(genre => (
            <span key={genre} className="tag genre-tag">{genre}</span>
          ))}
        </div>
        <p className="card-summary">{summary}</p>
        <div className="card-actions">
          <Link to={`/shows/${show.id}`} className="card-button detail">Detay</Link>
          <button onClick={handleAddToWatchlist} className="card-button add-list">Gösterime Ekle</button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;
