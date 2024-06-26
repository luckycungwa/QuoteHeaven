import React, { useState, useEffect, useCallback, useRef } from "react";
import { fetchQuote, fetchSearchQuote } from "../services/quoteApi";
import { FaArrowDown } from "react-icons/fa";
import * as htmlToImage from "html-to-image";
import ProgressLoader from "./ProgressLoader";
import SearchBar from "./SearchBar";
import TagList from "./TagList";

const BATCH_SIZE = 16; // Number of cards to fetch at a time

const predefinedColors = [
  '#0a0a0a', '#313131', '#2d2d2d', '#ff5959', '#003ffd', '#7b00ff',

];

function generateRandomGradient() {
  const getRandomColor = () => {
    return predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
  };

  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const color3 = getRandomColor();

  return `linear-gradient(180deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
}

const Card = ({ theme, onThemeChange }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const observer = useRef(null);
  const pageRef = useRef(0);

  const fetchData = useCallback(async (page) => {
    try {
      const quotes = await Promise.all(
        Array.from({ length: BATCH_SIZE }, fetchQuote)
      );

      const newCards = quotes.map((quote) => ({
        quote: quote.quote,
        author: quote.author,
        background: generateRandomGradient(),
      }));

      setCards((prevCards) => [...prevCards, ...newCards]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData(pageRef.current);
  }, [fetchData]);

  const fetchSearchResults = async (search) => {
    try {
      const results = await fetchSearchQuote(search);

      setCards(
        results.map((result) => ({
          quote: result.content,
          author: result.author,
          background: generateRandomGradient(),
        }))
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = (searchQuery) => {
    setSearch(searchQuery);
    setSelectedTag(""); // Clear selected tag when performing a new search
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    } else {
      setCards([]);
      fetchData(pageRef.current);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    fetchSearchResults(tag);
  };

  const downloadImage = (index) => {
    const image = document.querySelector(`#quote-img-${index}`);
    if (!image) {
      console.error(`Image element not found for index: ${index}`);
      return;
    }

    console.log("Downloading image for index:", index, image);

    htmlToImage
      .toPng(image)
      .then((dataUrl) => {
        console.log("Image data URL:", dataUrl);
        const link = document.createElement("a");
        link.download = "quote.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  const loadMoreCards = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    pageRef.current += 1;
    await fetchData(pageRef.current);
    setIsLoading(false);
  }, [fetchData, isLoading]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    const loadMoreTrigger = (entries) => {
      if (entries[0].isIntersecting) {
        loadMoreCards();
      }
    };
    observer.current = new IntersectionObserver(loadMoreTrigger);
    if (document.querySelector("#load-more-trigger")) {
      observer.current.observe(document.querySelector("#load-more-trigger"));
    }
  }, [loadMoreCards]);

  // Define some example tags
  const exampleTags = ["love", "life", "inspiration", "death", "wisdom", "resilience", "History", "humor"];

  return (
    <>
      <div className="header-ad" id="main">
        <TagList tags={exampleTags} onTagClick={handleTagClick} />
      </div>
      <hr className="hr"/>
      <div className="card-grid" style={{ backgroundColor: theme }}>
        <div className="filter-text">
          <SearchBar onSearch={handleSearch} />
          <h2 className="hero-heading underline">
            {selectedTag ?`${selectedTag} Quotes` : "Today's Quotes"}
          </h2>
          {isLoading && (
            <div>
              <div className="loadingScreen">
                {cards.length <= 0 && (
                  <div className="advert">
                    <ProgressLoader />
                  </div>
                )}
                {/* {cards.length >= 8 && (
                  <div className="advert">
                    <img src="./image-2.png" alt="advert" className="demo-ad" />
                  </div>
                )} */}
              </div>
            </div>
          )}
        </div>
        <div className="carousel-section">
          {cards.map((card, index) => (
            <div className="card" key={index} id="resize-mobile">
              <div id={`quote-img-${index}`} className="quote-img" style={{ backgroundImage: card.background }}>
                <div className="overlay" />
                <div className="card-content">
                  {card.quote && <p className="quote-text">" {card.quote} "</p>}
                  {card.author && <li className="author-name">{card.author}</li>}
                </div>
                <div className="card-footer">
                  <img
                    src="./images/logo_main.png"
                    className="water-mark"
                    alt="water mark"
                  />
                </div>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => downloadImage(index)}
                  className="card-btn"
                >
                  <FaArrowDown className="icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div id="load-more-trigger" style={{ height: "20px" }} />
      </div>
    </>
  );
};

export default Card;
