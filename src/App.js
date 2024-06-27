import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import SettingsModal from "./components/SettingsModal";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || '#9db1ff');
  const [font, setFont] = useState(localStorage.getItem('font') || 'Arial');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedFont = localStorage.getItem('font');
    if (savedTheme) setTheme(savedTheme);
    if (savedFont) setFont(savedFont);
    document.body.style.backgroundColor = theme;
    document.body.style.fontFamily = font;
  }, [theme, font]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.style.backgroundColor = newTheme;
  };

  const handleFontChange = (newFont) => {
    setFont(newFont);
    localStorage.setItem('font', newFont);
    document.body.style.fontFamily = newFont;
  };

  const handleOpenSettings = () => {
    setIsSettingsModalOpen(true);
  };

  return (
    <main className={isDarkMode ? "dark-theme" : "light-theme"}>
      <div className="MainScreen">
        <Navbar onOpenSettings={handleOpenSettings} />
        <div>
          <Home theme={theme} onThemeChange={handleThemeChange} />
          <div className="fab ">
            <ScrollToTop />
          </div>
        </div>
        <div className="footer">
          <div className="footer glass-effect" id="hide-mobile">
            <hr className="footer-hr" />
            <p className="">
              <a
                href="https://portfolio-zeta-one-31.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                by Lucky Cungwa
              </a>{" "}
              | All Rights Reserved - &copy; 2024
            </p>
          </div>
        </div>
      </div>
      {isSettingsModalOpen && (
        <SettingsModal
          onClose={() => setIsSettingsModalOpen(false)}
          onThemeChange={handleThemeChange}
          onFontChange={handleFontChange}
          currentTheme={theme}
          currentFont={font}
        />
      )}
    </main>
  );
}

export default App;
