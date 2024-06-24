import axios from 'axios';

const quotableApi = 'https://api.quotable.io/random';
const searchApi = 'https://api.quotable.io/search/quotes';

// function for random quotes
export async function fetchQuote() {
  try {
    const response = await axios.get(quotableApi);
    const { content: quote, author } = response.data;
    return { quote, author };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return { quote: 'An error occurred. Please try again later.', author: '' };
  }
}

// function for search results of quotes
export async function fetchSearchQuote(search) {
  try {
    const response = await axios.get(`${searchApi}?query=${search}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}
