import axios from 'axios';

const newApi = 'https://type.fit/api/quotes'; // New API for fetching quotes

// Function for random quotes
export async function fetchQuote() {
  try {
    const response = await axios.get(newApi);
    const quotes = response.data;
    return quotes[Math.floor(Math.random() * quotes.length)];
  } catch (error) {
    console.error('Error fetching quote:', error.response || error.message);
    // Fallback to local quotes.json
    const localQuotes = await fetch('/quotes.json').then(res => res.json());
    return localQuotes[Math.floor(Math.random() * localQuotes.length)];
  }
}

// Function for search results of quotes
export async function fetchSearchQuote(search) {
  try {
    const response = await axios.get(newApi);
    const quotes = response.data;
    return quotes.filter(quote =>
      quote.text.toLowerCase().includes(search.toLowerCase()) || 
      quote.author.toLowerCase().includes(search.toLowerCase())
    );
  } catch (error) {
    console.error('Error finding related inspiration:', error.response || error.message);
    // Fallback to local quotes.json untill we our free quotes is back online :(
    const localQuotes = await fetch('/quotes.json').then(res => res.json());
    return localQuotes.filter(quote =>
      quote.en.toLowerCase().includes(search.toLowerCase()) || 
      quote.author.toLowerCase().includes(search.toLowerCase())
    );
  }
}
