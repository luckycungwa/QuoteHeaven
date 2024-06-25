import React, { useState } from 'react';
import { FaInfoCircle, FaBars } from 'react-icons/fa';
import InfoModal from './InfoModal';
import './navbar.css';

const Navbar = ({ onOpenSettings }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleInfoClick = () => {
    setIsInfoModalOpen(true);
  };

  const handleSettingsClick = () => {
    onOpenSettings();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-item" onClick={handleInfoClick}>
          <FaInfoCircle size={24} />
        </div>
        <div className="navbar-item">
          <img src="./images/logo_main.png" className="logo" alt="Cover Logo" />
        </div>
        <div className="navbar-item" onClick={handleSettingsClick}>
          <FaBars size={24} />
        </div>
      </nav>
      {isInfoModalOpen && <InfoModal onClose={() => setIsInfoModalOpen(false)} />}
    </>
  );
};

export default Navbar;
