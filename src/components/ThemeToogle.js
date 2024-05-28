import React, { useState } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      

    </button>
  );
};

export default ThemeToggle;