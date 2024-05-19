import React, { useState, useEffect } from "react";
import { fetchQuote } from "../services/quoteApi";
import { fetchRandomImage } from "../services/unsplashApi";
import { FaArrowDown } from 'react-icons/fa';

const Card = () => {
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quote = await fetchQuote();
        console.log('Fetched Quote:', quote);  // Log the fetched quote
        setQuoteData(quote);

        const image = await fetchRandomImage("minimal");
        console.log('Fetched Image URL:', image);  // Log the fetched image URL
        setImageUrl(image);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card">
      <div className='card-img' style={{ backgroundImage: `url(${imageUrl})` }} alt="Card Image" />
      {/* <div className="overlay"></div>  */}
      <div className="card-content">
        {quoteData.quote && <p className="quote-text">" {quoteData.quote}"</p>}
        {quoteData.author && <li className="author-name">{quoteData.author}</li>}
      </div>
      <div className="card-footer">
        <p className="credit-text">
          Image by{" "}
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>
        </p>
        <div className="card-btn">
          <FaArrowDown className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Card;
