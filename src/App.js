import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
// import ThemeToggle from "./components/ThemeToogle";

function App() {
  // theme stuff
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <section className={isDarkMode ? "dark-theme" : "light-theme"}>
      <div className="MainScreen">
        <div className="logo-container" id="hide-mobile">
          <img src="./images/logo_main.png" className="logo" alt="Cover Logo" />
        </div>
        <div>
          <Home />
          <div className="fab glass-effect">
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
                Lucky Cungwa
              </a>{" "}
              | All Rights Reserved - &copy; 2024
            </p>
            <input
              type="checkbox"
              className="theme-checkbox"
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
