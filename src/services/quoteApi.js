import axios from 'axios';

const quotableApi = 'https://api.quotable.io/random';
const searchApi = 'https://api.quotable.io/search/quotes';

// Function for random quotes
export async function fetchQuote() {
  try {
    const response = await axios.get(quotableApi);
    const { content: quote, author } = response.data;
    return { quote, author };
  } catch (error) {
    console.error('Error fetching quote:', error.response || error.message);
    return { quote: 'Failed to get some inspiration. Please try again.', author: '' };
  }
}

// Function for search results of quotes
export async function fetchSearchQuote(search) {
  try {
    const response = await axios.get(`${searchApi}?query=${search}`);
    return response.data.results;
  } catch (error) {
    console.error('Error finding related inspiration:', error.response || error.message);
    return [];
  }
}
