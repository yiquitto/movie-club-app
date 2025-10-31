import React from 'react';
import './SearchBox.css';

const SearchBox = ({ query, dispatch }) => {
  return (
    <input 
      type="text" 
      value={query} // Değer doğrudan state'den geliyor
      onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })} // Değişiklik anında state'i güncelliyor
      placeholder="Dizi ara (örn: star, batman)" 
      className="search-input" />
  );
};

export default SearchBox;