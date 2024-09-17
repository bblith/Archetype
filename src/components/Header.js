import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import '../styles/Header.css';
import Logo from '../assets/Logo.png'; 
import JagHacksLogo from '../assets/JagHacksLogo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/">
            <img src={JagHacksLogo} alt="JagHacks Logo" className="logo" />
          </Link>
        </div>
        <div className="header-right">
          <Link to="/">
            <img src={Logo} alt="JagHacks Monogram" className="logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
