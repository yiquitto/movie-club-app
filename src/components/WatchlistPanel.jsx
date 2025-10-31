import React from 'react';
import './WatchlistPanel.css';

const WatchlistPanel = ({ watchlist, dispatch }) => {
  return (
    <div className="watchlist-panel">
      <h4>Gösterime Girecekler ({watchlist.length})</h4>
      {watchlist.length === 0 ? (
        <p className="watchlist-empty">Listeniz boş.</p>
      ) : (
        <ul className="watchlist-items">
          {watchlist.map(show => (
            <li key={show.id} className="watchlist-item">
              <span>{show.name}</span>
              <button onClick={() => dispatch({ type: 'REMOVE_WATCHLIST', payload: show.id })}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
      {watchlist.length > 0 && (
        <button 
          onClick={() => dispatch({ type: 'CLEAR_WATCHLIST' })} 
          className="clear-watchlist-btn"
        >
          Listeyi Temizle
        </button>
      )}
    </div>
  );
};

export default WatchlistPanel;
