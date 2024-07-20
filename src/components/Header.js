import React from 'react';
import '../styles/Header.css';
import Logo from '../assets/Logo.png'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>JagHacks | 2024</h1>
        </div>
        <div className="header-right">
          <img src={Logo} alt="Cyber Beyond Logo" className="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
