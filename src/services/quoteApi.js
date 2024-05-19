import axios from 'axios';

const quotableApi = 'https://api.quotable.io/random';

export async function fetchQuote() {
  try {
    const response = await axios.get(quotableApi);
    console.log('API Response:', response);
    const { content: quote, author } = response.data;
    return { quote, author };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return { quote: 'An error occurred. Please try again later.', author: '' };
  }
}

