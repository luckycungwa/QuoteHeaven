import axios from 'axios';

const unsplashApi = 'https://api.unsplash.com/photos/random';
const accessKey = 'BJEwYNptB4Dw4m5_bVt4XZ0Beuf322bDU-yhn1_zoHU'; // Replace with your Unsplash Access Key

export async function fetchRandomImage(query) {
  try {
    const response = await axios.get(unsplashApi, {
      params: { query },
      headers: { Authorization: `Client-ID ${accessKey}` }
    });
    return response.data.urls.regular;
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
}
