import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, dispatch }) => {
  if (totalPages <= 1) return null;

  const setPage = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  return (
    <div className="pagination-controls">
      <button onClick={() => setPage(1)} disabled={currentPage === 1}>İlk</button>
      <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>Geri</button>
      <span>Sayfa {currentPage} / {totalPages}</span>
      <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>İleri</button>
      <button onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>Son</button>
    </div>
  );
};

export default Pagination;