import React from 'react';
import { FaCog, FaCode } from 'react-icons/fa';
import './navbar.css';

const Navbar = ({ onOpenSettings }) => {

  const handleInfoClick = () => {
    // visit my portfolio site
    window.open('https://portfolio-zeta-one-31.vercel.app/', '_blank');
  };

  const handleSettingsClick = () => {
    onOpenSettings();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-item" onClick={handleInfoClick}>
          <FaCode size={24} />
        </div>
        <div className="navbar-item">
          <img src="./images/logo_main.png" className="logo" alt="Logo" />
        </div>
        <div className="navbar-item" onClick={handleSettingsClick}>
          <FaCog size={24} />
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;
