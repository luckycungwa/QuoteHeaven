import quotes from './quotes.json'; // Assuming quotes.json is in the same directory

// Function to get a random quote from the imported JSON file
export function fetchLocalQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.quotes.length);
  const { quote, author } = quotes.quotes[randomIndex];
  return { text: quote, author };
}



// Function for random quotes
export async function fetchQuote() {
  return fetchLocalQuote();
}

// Function for search results of quotes
export async function fetchSearchQuote(search) {
  return quotes.filter(quote =>
    quote.en.toLowerCase().includes(search.toLowerCase()) || 
    quote.author.toLowerCase().includes(search.toLowerCase())
  );
}
