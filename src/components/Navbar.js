import React, { useState } from 'react';
import { FaCog, FaCode } from 'react-icons/fa';
import InfoModal from './InfoModal';
import './navbar.css';

const Navbar = ({ onOpenSettings }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleInfoClick = () => {
    // setIsInfoModalOpen(true);
    // open new link in new tab
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
          <img src="./images/logo_main.png" className="logo" alt="Cover Logo" />
        </div>
        <div className="navbar-item" onClick={handleSettingsClick}>
          <FaCog size={24} />
        </div>
      </nav>
      {isInfoModalOpen && <InfoModal onClose={() => setIsInfoModalOpen(false)} />}
    </>
  );
};

export default Navbar;
