import React, { useEffect, useState } from "react";
import { fetchQuote } from "../services/quoteApi";
import "./HeroSection.css";

const HeroSection = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const getRandomQuote = async () => {
      try {
        const randomQuote = await fetchQuote();
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      } catch (error) {
        console.error("Error fetching the quote:", error);
      }
    };

    getRandomQuote();
  }, []);

  const handleScrollToMain = () => {
    // document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({
      top: document.getElementById("main").offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="hero">
    <div></div>
      <div className="hero-content">
      
        <h1 className="hero-heading">The Daily Rise & Thrive</h1>
        <p className="hero-subheading">
          {quote ? `"${quote}" - ${author}` : "Inspire your day..."}
        </p>
      </div>
      <button className="hero-button" onClick={handleScrollToMain} aria-label="View more quotes">
        Get Inspired
      </button>
      <div></div>
    </div>
  );
};

export default HeroSection;
