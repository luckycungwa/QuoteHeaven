import axios from 'axios';

const unsplashApi = 'https://api.unsplash.com/photos/random'; // Replace with appropriate API URL
const apiKey = 'YOUR_API_KEY'; // Replace with your API key

export async function fetchWallpaper() {
  try {
    const response = await axios.get(unsplashApi, {
      params: { client_id: apiKey },
    });
    const { urls, alt_description, user: { name } } = response.data; // Destructure data
    return { url: urls.regular, description: alt_description, photographer: name };
  } catch (error) {
    console.error('Error fetching wallpaper:', error);
    return { url: '', description: 'Error fetching wallpaper', photographer: '' };
  }
}
