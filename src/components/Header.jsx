import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <h2 className="app-title">🎬 Kampüs Film Kulübü</h2>
        <nav>
          <Link to="/" className="nav-link">Ana Sayfa</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;