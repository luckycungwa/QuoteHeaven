import React, { useState, useEffect, useCallback, useRef } from "react";
import { fetchQuote, fetchSearchQuote } from "../services/quoteApi";
import { fetchRandomImage } from "../services/unsplashApi";
import { FaArrowDown } from "react-icons/fa";
import * as htmlToImage from "html-to-image";
import ProgressLoader from "./ProgressLoader";
import SearchBar from "./SearchBar";
import TagList from "./TagList";
import styles from "./loadestyles.css";

const BATCH_SIZE = 16; // Number of cards to fetch at a time

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
      const images = await Promise.all(
        Array.from({ length: BATCH_SIZE }, () =>
          fetchRandomImage("texture backgrounds")
        )
      );

      const newCards = quotes.map((quote, index) => ({
        quote: quote.quote,
        author: quote.author,
        imageUrl: images[index],
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
      const images = await Promise.all(
        Array.from({ length: results.length }, () =>
          fetchRandomImage("texture backgrounds")
        )
      );

      setCards(
        results.map((result, index) => ({
          quote: result.content,
          author: result.author,
          imageUrl: images[index],
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
  const exampleTags = ["love", "life", "inspiration", "humor", "wisdom"];

  return (
    <>
      <div className="header-ad" id="main">
        <TagList tags={exampleTags} onTagClick={handleTagClick} />
        
      </div>

      <hr className="hr"/>
      <div className="card-grid" style={{ backgroundColor: theme }}>
      
        <div className="filter-text">
          <SearchBar onSearch={handleSearch} />
          <h2 className="hero-heading">Today's Quotes</h2>
          {isLoading && (
            <div>
              <div className="loadingScreen">
                {/* load advert div unless cards have loaded > 8 */}
                {cards.length <= 0 && (
                  <div className="advert">
                    <ProgressLoader />
                  </div>
                )}

                {cards.length >= 8 && (
                  <div className="advert">
                    {/* <p>Advert Text...</p> */}
                    <img src="./image-2.png" alt="advert" className="demo-ad" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="carousel-section">
          {cards.map((card, index) => (
            <div className="card" key={index} id="resize-mobile">
              <div id={`quote-img-${index}`} className="quote-img">
                <div className="image" alt="background">
                  <img
                    src={card.imageUrl}
                    alt="background cover"
                    className="card-img"
                    lazy="true"
                  />
                </div>
                <div className="overlay" />
                <div className="card-content">
                  {card.quote && <p className="quote-text">"{card.quote}"</p>}
                  {card.author && (
                    <li className="author-name">{card.author}</li>
                  )}
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
                <p className="credit-text">
                  Image by{" "}
                  <a
                    href={card.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unsplash
                  </a>
                </p>
                <button
                  onClick={() => downloadImage(index)}
                  className="z-999 card-btn"
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
