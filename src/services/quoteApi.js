import localQuotes from './quotes.json'; //using local api since free apis are limited

// Function to get a random quote from the local JSON file
export function fetchLocalQuote() {
  const randomIndex = Math.floor(Math.random() * localQuotes.length);
  const { en: text, author } = localQuotes[randomIndex];
  return { text, author };
}

// Function for random quotes
export async function fetchQuote() {
  return fetchLocalQuote();
}

// Function for search results of quotes
export async function fetchSearchQuote(search) {
  return localQuotes.filter(quote =>
    quote.en.toLowerCase().includes(search.toLowerCase()) || 
    quote.author.toLowerCase().includes(search.toLowerCase())
  );
}
