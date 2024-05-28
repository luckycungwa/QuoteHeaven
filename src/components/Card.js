import React, { useState, useEffect } from "react";
import { fetchQuote } from "../services/quoteApi";
import { fetchRandomImage } from "../services/unsplashApi";
import { FaArrowDown } from "react-icons/fa";
// Image conversion stuff
import * as htmlToImage from "html-to-image";

const Card = () => {
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });
  const [cards, setCards] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quote = await fetchQuote();
        console.log("Fetched Quote:", quote);

        const image = await fetchRandomImage("texture backgrounds");
        console.log("Fetched Image URL:", image);

        const newCard = {
          quote: quote.quote,
          author: quote.author,
          imageUrl: image,
        };

        setCards((prevCards) => [...prevCards, newCard]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch initial data
    fetchData();

    // Fetch additional data if needed, for example, every time component mounts
    // or based on user action
  }, []);

  // handle image download
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

  return (
    <>
      {cards.map((card, index) => (
        <div className="card" key={index} id="resize-mobile">
          <div id={`quote-img-${index}`} className="quote-img">
            <div className="image" alt="background">
              <img
                src={card.imageUrl}
                alt="background cover"
                className="card-img"
                lazy={true}
              />
            </div>
            <div className="overlay" />
            <div className="card-content">
              {card.quote && <p className="quote-text">" {card.quote}"</p>}
              {card.author && <li className="author-name">{card.author}</li>}
            </div>
            <div className="card-footer">
            <img src="./images/logo_main.png" className="water-mark" alt="Cover Logo" />
          </div>
          </div>
          

          <div className="card-footer">
            <p className="credit-text">
              Image by{" "}
              <a href={card.imageUrl} target="_blank" rel="noopener noreferrer">
                Unsplash
              </a>
            </p>
            <button onClick={() => downloadImage(index)} className="card-btn">
              <FaArrowDown className="icon" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
