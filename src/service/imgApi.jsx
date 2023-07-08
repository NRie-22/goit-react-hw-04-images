import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '34991535-a7425182e30d9d17c0e128526';

export const imgApi = async (query, page) => {
  const options = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 12,
    },
  };

  const response = await axios.get(API_URL, options);
  return response;
};
