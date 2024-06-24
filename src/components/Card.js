import React, { useState, useEffect, useCallback, useRef } from "react";
import { fetchQuote, fetchSearchQuote } from "../services/quoteApi";
import { fetchRandomImage } from "../services/unsplashApi";
import { FaArrowDown } from "react-icons/fa";
import * as htmlToImage from "html-to-image";
import ProgressLoader from "./ProgressLoader";
import SearchBar from "./SearchBar";

const BATCH_SIZE = 16; // Number of cards to fetch at a time

const Card = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
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
      setCards(results.map(result => ({
        quote: result.content,
        author: result.author,
        imageUrl: fetchRandomImage("texture backgrounds")
      })));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  const handleSearch = (searchQuery) => {
    setSearch(searchQuery);
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    } else {
      setCards([]);
      fetchData(pageRef.current);
    }
  }

  const downloadImage = (index) => {
    const image = document.querySelector(`#quote-img-${index}`);
    htmlToImage
      .toPng(image)
      .then((dataUrl) => {
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

  return (
    <>
      <div className="card-grid">
        <SearchBar onSearch={handleSearch} />
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
                  {card.quote && <p className="quote-text">" {card.quote}"</p>}
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
        {isLoading && (
          <div>
            <ProgressLoader />
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
