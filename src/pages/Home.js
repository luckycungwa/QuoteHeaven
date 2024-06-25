import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

const Home = ({ theme, onThemeChange }) => {
  return (
    <>
        <div className="App">
        <HeroSection/>
          <Card theme={theme} onThemeChange={onThemeChange} />
        </div>
    </>
  );
};

export default Home;
