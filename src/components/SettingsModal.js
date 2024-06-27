import React, { useState} from "react";
import "./modal.css";

const SettingsModal = ({ onClose, onThemeChange, onFontChange, currentTheme, currentFont }) => {
  const [font, setFont] = useState(currentFont);
  const [theme, setTheme] = useState(currentTheme);


  const themeOptions = [
    { color: "#F6F6F6" },
    { color: "#9db1ff" },
    { color: "#FFD6EC" },
    { color: "#CCFFBD" },
    { color: "#BCCEF8" },
    { color: "#313131" },
    
  ];

  const fontOptions = [
    { fontFamily: "Poppins" },
    { fontFamily: "Bebas Neue" },
    { fontFamily: "Noto Sans Display" },
    { fontFamily: "Patrick Hand SC" },
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
          <button className="secondaryBtn" onClick={onClose} aria-label="Cancel settings">
            Cancel
          </button>
          <button className="primaryBtn" onClick={handleApply} aria-label="Apply settings">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
