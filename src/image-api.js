import axios from 'axios';

const API_KEY = '39344884-58dfe21e72d55086ae867b0a2';

export function searchImages(value) {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
}
