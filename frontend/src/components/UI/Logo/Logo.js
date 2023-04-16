import React from 'react';
import logo from './LogoFav.ico';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="logo" className="logo" />
      <h1 className="logo-text">VenueVerse</h1>
    </div>
  );
};

export default Logo;
