import React, { useState, useEffect } from "react";
import "./modal.css";

const SettingsModal = ({ onClose, onThemeChange, onFontChange, currentTheme, currentFont }) => {
  const [font, setFont] = useState(currentFont);
  const [theme, setTheme] = useState(currentTheme);


  const themeOptions = [
    { color: "#F6F6F6" },
    { color: "#9db1ff" },
    { color: "#ffe7e7" },
    { color: "#CCFFBD" },
    { color: "#A0C1B8" },
    { color: "#313131" },
    
  ];

  const fontOptions = [
    { fontFamily: "Montserrat" },
    { fontFamily: "Poppins" },
    { fontFamily: "Bodoni Moda" },
    { fontFamily: "Bebas Neue" },
  ];

  const handleApply = () => {
    onFontChange(font);
    onThemeChange(theme);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Settings</h2>

        <div className="modal-list">
          <label>Font:</label>
          <div className="theme-options">
            {fontOptions.map((foption) => (
              <div key={foption.fontFamily} onClick={() => setFont(foption.fontFamily)}>
                <p className="option" style={{ fontFamily: foption.fontFamily }}>Aa</p>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-list">
          <label>Theme:</label>
          <div className="theme-options">
            {themeOptions.map((option) => (
              <div
                className="colorOption"
                style={{ backgroundColor: option.color }}
                key={option.color}
                onClick={() => setTheme(option.color)}
              ></div>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button className="secondaryBtn" onClick={onClose}>
            Cancel
          </button>
          <button className="primaryBtn" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
